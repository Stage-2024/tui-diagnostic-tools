import { useState, useEffect } from 'react';
import { fetchBuckets, fetchObjectsInBucket } from '../services/s3Service.js';
import { s3Config } from '../config/index.js';
import { TODO } from '../types/todo.js';
import Pagination from '../types/pagination.js'

export const useS3 = ({ itemsPerBucketPage = 5, itemsPerObjectPage = 10 }: Pagination) => {
  const [buckets, setBuckets] = useState<string[]>([]);
  const [bucketPage, setBucketPage] = useState(1);

  const [selectedBucket, setSelectedBucket] = useState<string | null>(null);
  const [objects, setObjects] = useState<TODO[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tokens, setTokens] = useState<string[]>([]);

  const paginatedBuckets = buckets.slice((bucketPage - 1) * itemsPerBucketPage, bucketPage * itemsPerBucketPage);
  const nbBucketPage = Math.ceil(buckets.length / itemsPerBucketPage)

  const paginatedObjects = objects.slice((currentPage - 1) * itemsPerObjectPage, currentPage * itemsPerObjectPage);
  const nbObjectPage = Math.ceil(objects.length / itemsPerObjectPage)

  useEffect(() => {
    const getBuckets = async () => {
      try {
        const bucketNames = await fetchBuckets();
        setBuckets(bucketNames);
      } catch (error) {
        console.log(s3Config)
        console.error('Failed to fetch buckets:', error);
      }
    };

    getBuckets();
  }, []);

  const handleBucketNextPage = () => {
    setBucketPage((prevPage) => prevPage % nbBucketPage + 1);
  };

  const handleBucketPrevPage = () => {
    if (bucketPage > 1) {
      setBucketPage(prevPage => prevPage - 1);
    } else {
      setBucketPage(nbBucketPage)
    }

  };

  const loadObjectsInBucket = async (bucketName: string, continuationToken?: string) => {
    const result = await fetchObjectsInBucket(bucketName, continuationToken);
    setObjects(result.Contents || []);
    if (result.NextContinuationToken) {
      setTokens(prevTokens => [...prevTokens, result.NextContinuationToken] as string[]);
    }
  };

  const nextPage = () => {
    /*
    if (tokens[currentPage + 1]) {
      setCurrentPage(currentPage + 1);
      loadObjectsInBucket(selectedBucket!, tokens[currentPage + 1]);
    }
    */
   setCurrentPage((prevPage) => prevPage % nbObjectPage + 1)
  };

  const prevPage = () => {
    /*
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      loadObjectsInBucket(selectedBucket!, tokens[currentPage - 1]);
    }
    */
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    } else {
      setCurrentPage(nbObjectPage)
    }
  };

  useEffect(() => {
    if (selectedBucket) {
      setObjects([]);
      setTokens([]);
      setCurrentPage(1);
      loadObjectsInBucket(selectedBucket);
    }
  }, [selectedBucket]);

  return {
    //Bucket list
    buckets: paginatedBuckets,
    bucketPage,
    nbBucketPage,
    handleBucketNextPage,
    handleBucketPrevPage,

    //Object list
    selectedBucket,
    setSelectedBucket,
    objects: paginatedObjects,
    currentPage,
    nbObjectPage,
    nextPage,
    prevPage,
    tokens,
  };
};