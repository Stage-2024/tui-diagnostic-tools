import { useState, useEffect } from 'react';
import { fetchBuckets, fetchObjectsInBucket, getObject, putObject} from '../services/s3Service.js';
import { s3Config } from '../config/index.js';
import { TODO } from '../types/todo.js';
import { Message } from '../types/message.js';
import Pagination from '../types/pagination.js'
import { BucketObject } from '../types/bucketObject.js';
import { getBucketObject, sortObjects } from '../utils/helper.js';
import fs from 'node:fs'
import * as path from 'node:path';
import os from 'os'
import { Clipboard } from '../types/clipboard.js';

export const useS3 = () => {
  const [buckets, setBuckets] = useState<string[]>([]);
  const [selectedBucket, setSelectedBucket] = useState<string | null>(null);

  const [objects, setObjects] = useState<BucketObject[]>([]);
  const [selectedObject, setSelectedObject] = useState<BucketObject | null>(null)
  const [highlightedObject, setHighlightedObject] = useState<BucketObject | null>(null)

  const [tokens, setTokens] = useState<string[]>([]);

  useEffect(() => {
    getBuckets();
  }, []);

  const getBuckets = async () => {
    try {
      const bucketNames = await fetchBuckets();
      setBuckets(bucketNames);
    } catch (error) {
      console.log(s3Config)
      console.error('Failed to fetch buckets:', error);
    }
  };

  const loadObjectsInBucket = async (bucketName: string, continuationToken?: string): Promise<BucketObject[]> => {
    const result = await fetchObjectsInBucket(bucketName, continuationToken)
    const messyObjects: BucketObject[] = result.Contents?.map(obj => ({
      ...obj, 
      Key: obj.Key || 'errnokey', 
      FullKey: obj.Key || 'errnokey',
      Size: obj.Size || 0,
      Truc: obj.LastModified
    })) || []
    const orderedObjects: BucketObject[] = sortObjects(messyObjects)
    setObjects(orderedObjects)

    if (result.NextContinuationToken) {
      setTokens(prevTokens => [...prevTokens, result.NextContinuationToken] as string[]);
    }

    return orderedObjects;
  };

  const refresh = async () => {
    setObjects([])
    
    if(selectedBucket){
      const objects = await loadObjectsInBucket(selectedBucket)
      if(selectedObject){
        //IL FAUT RECUP LE NOUVEAU SELECTED OBJECT
        const newSelectedObject = getBucketObject(selectedObject.FullKey, objects)
        
        if(!newSelectedObject){
          setSelectedObject(null)
        } else {
          setSelectedObject(newSelectedObject)
        }
      }
    } else {
      const buckets = await getBuckets()
    }
    
    //setSelectedObject(currentFolder ?? null)
  }

  const downloadObject = async (objectName: string, bucketName: string): Promise<Message> => {
    const result = await getObject(objectName, bucketName)
    //await new Promise((resolve) => setTimeout(resolve, 3000));
    const objectData = await result.Body?.transformToByteArray() ?? ''
    const fileName: string = objectName.split('/').slice(-1)[0] || 'undefined'
    const path: string = os.homedir() + '/Downloads/' + fileName
    let message: Message = null
    const writeFilePromise: Promise<Message> = new Promise<Message>((resolve) => {
      fs.writeFile(path, objectData, (err) => {
        if (err) {
          message =  {
            content: [
              {text: 'Erreur lors de l\'écriture du fichier: '},
              {
                text: err.message,
                highlight: true
              }
            ]
          }
        } else {
          message = {
            content: [
              {text: 'L\'objet '},
              {
                text: objectName,
                highlight: true
              },
              {text: ' a été téléchargé avec succès.'}
            ]
          }
        }
        resolve(message)
      })
    })
    return await writeFilePromise
  }

  const addObject = async (clipBoard?: Clipboard, newBucket?: string, newFolderKey? : string) => {
    if(clipBoard){
      const object = await getObject(clipBoard.item.FullKey ?? clipBoard.item.Key, clipBoard.bucket)
      const newObjectKey: string = (newFolderKey ?? '') + '/' + clipBoard.item.Key
      const objectData = await object.Body?.transformToByteArray()
      const result = await putObject(newObjectKey, objectData, newBucket ?? selectedBucket ?? '')
      return result
    } else {
      return 'no clipboard'
    }
    
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
    addObject,

    refresh,

    tokens,
  };
};