import { S3Client, ListBucketsCommand, ListObjectsV2Command, Bucket } from '@aws-sdk/client-s3';
import { s3Config } from '../config/index.js';

export const s3Client = new S3Client(s3Config);

export const fetchBuckets = async () => {
    const result = await s3Client.send(new ListBucketsCommand({}));
    const buckets: string[] = result.Buckets?.map((bucket: Bucket) => bucket.Name || 'undefined name') || ['rip', 'lol'];
    return buckets
};

export const fetchObjectsInBucket = async (bucketName: string, maxKeys: number, continuationToken?: string) => {

  /*
  if (continuationToken) {
    command.ContinuationToken = continuationToken;
  }
  */
  const command = new ListObjectsV2Command({
    MaxKeys: maxKeys,
    Bucket: bucketName,
    ContinuationToken: continuationToken
  })

  const result = await s3Client.send(command);
  return result;
};