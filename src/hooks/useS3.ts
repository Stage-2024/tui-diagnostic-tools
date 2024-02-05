import { useState, useEffect } from 'react';
import { fetchBuckets, fetchObjectsInBucket } from '../services/s3Service.js';

export const useS3 = (
  itemsPerBucketPage: number = 5,
  itemsPerObjectPage: number = 10
) => {
  const [buckets, setBuckets] = useState<string[]>([]);
  const [bucketPage, setBucketPage] = useState(1);
  const [selectedBucket, setSelectedBucket] = useState<string | null>(null);
  const [objects, setObjects] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [tokens, setTokens] = useState<string[]>([]);

  useEffect(() => {
    const getBuckets = async () => {
      try {
        console.log('les buckets :')
        const bucketNames = await fetchBuckets();
        console.log(bucketNames)
        setBuckets(bucketNames);
      } catch (error) {
        console.error('Failed to fetch buckets:', error);
      }
    };

    getBuckets();
  }, []);

  const paginatedBuckets = buckets.slice((bucketPage - 1) * itemsPerBucketPage, bucketPage * itemsPerBucketPage);

  const handleBucketNextPage = () => {
    if (bucketPage * itemsPerBucketPage < buckets.length) {
      setBucketPage(prevPage => prevPage + 1);
    }
  };

  const handleBucketPrevPage = () => {
    if (bucketPage > 1) {
      setBucketPage(prevPage => prevPage - 1);
    }
  };

  const loadObjectsInBucket = async (bucketName: string, continuationToken?: string) => {
    const result = await fetchObjectsInBucket(bucketName, itemsPerObjectPage, continuationToken);

    setObjects(result.Contents || []);

    if (result.NextContinuationToken) {
      setTokens(prevTokens => [...prevTokens, result.NextContinuationToken] as string[]);
    }
  };

  const nextPage = () => {
    if (tokens[currentPage + 1]) {
      setCurrentPage(currentPage + 1);
      loadObjectsInBucket(selectedBucket!, tokens[currentPage + 1]);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      loadObjectsInBucket(selectedBucket!, tokens[currentPage - 1]);
    }
  };

  useEffect(() => {
    if (selectedBucket) {
      setObjects([]);
      setTokens([]);
      setCurrentPage(0);
      loadObjectsInBucket(selectedBucket);
    }
  }, [selectedBucket]);

  return {
    buckets: paginatedBuckets,
    selectedBucket,
    setSelectedBucket,
    objects,
    nextPage,
    prevPage,
    currentPage,
    tokens,
    handleBucketNextPage,
    handleBucketPrevPage
  };
};