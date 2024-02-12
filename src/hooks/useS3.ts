import { useState, useEffect } from 'react';
import { fetchBuckets, fetchObjectsInBucket, getObject} from '../services/s3Service.js';
import { s3Config } from '../config/index.js';
import { TODO } from '../types/todo.js';
import Pagination from '../types/pagination.js'
import { BucketObject } from '../types/bucketObject.js';
import { sortObjects } from '../utils/helper.js';
import fs from 'node:fs'
import * as path from 'node:path';
import os from 'os'

export const useS3 = () => {
  const [buckets, setBuckets] = useState<string[]>([]);
  const [selectedBucket, setSelectedBucket] = useState<string | null>(null);

  const [objects, setObjects] = useState<BucketObject[]>([]);
  const [selectedObject, setSelectedObject] = useState<BucketObject | null>(null)
  const [highlightedObject, setHighlightedObject] = useState<BucketObject | null>(null)

  const [tokens, setTokens] = useState<string[]>([]);

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

  const loadObjectsInBucket = async (bucketName: string, continuationToken?: string) => {
    const result = await fetchObjectsInBucket(bucketName, continuationToken)
    const messyObjects: BucketObject[] = result.Contents?.map(obj => ({...obj, Key: obj.Key || 'nokey'})) || []
    const orderedObjects: BucketObject[] = sortObjects(messyObjects)
    setObjects(orderedObjects)

    if (result.NextContinuationToken) {
      setTokens(prevTokens => [...prevTokens, result.NextContinuationToken] as string[]);
    }
  };

  const downloadObject = async (objectName: string, bucketName: string) => {
    const result = await getObject(objectName, bucketName)
    const objectData = await result.Body?.transformToByteArray() ?? ''
    const fileName: string = objectName.split('/').slice(-1)[0] || 'undefined'
    //const path: string = "C:/Users/lylia/Downloads/" + fileName
    const path: string = os.homedir() + '/Downloads/' + fileName
    fs.writeFile(path, objectData, (err) => {
      if (err) {
          return 'Erreur lors de l\'écriture du fichier:' + err
      } else {
          return 'L\'objet a été téléchargé avec succès.'
      }
    })
  }

  useEffect(() => {
    if (selectedBucket) {
      setObjects([]);
      setTokens([]);
      loadObjectsInBucket(selectedBucket);
    }
  }, [selectedBucket]);

  return {
    //Bucket list
    buckets,
    selectedBucket,
    setSelectedBucket,

    //Object list
    objects,
    selectedObject,
    setSelectedObject,
    highlightedObject,
    setHighlightedObject,
    downloadObject,

    tokens,
  };
};