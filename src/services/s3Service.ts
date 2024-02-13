import { S3Client, ListBucketsCommand, ListObjectsV2Command, Bucket, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Config } from '../config/index.js';
import { TODO } from '../types/todo.js';

export const s3Client = new S3Client(s3Config);

export const fetchBuckets = async () => {
    const result = await s3Client.send(new ListBucketsCommand({}));
    const buckets: string[] = result.Buckets?.map((bucket: Bucket) => bucket.Name || 'undefined name') || [];
    return buckets
};

export const fetchObjectsInBucket = async (bucketName: string, continuationToken?: string) => {

  /*
  if (continuationToken) {
    command.ContinuationToken = continuationToken;
  }
  */
  const command = new ListObjectsV2Command({
    Bucket: bucketName,
    ContinuationToken: continuationToken
  })

  const result = await s3Client.send(command);
  return result;
};

export const getObject = async (objectName: string, bucketName: string) => {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: objectName
  })
  const result = await s3Client.send(command)
  return result
}

export const putObject = async (objectName: string, data: TODO, bucketName: string) => {
  const command  = new PutObjectCommand({
    Bucket: bucketName,
    Key: objectName,
    Body: data
  })

  const result = await s3Client.send(command)
  return result
}