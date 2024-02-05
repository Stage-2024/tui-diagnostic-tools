import { S3Client, ListBucketsCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { s3Config } from '../config/index.js';

export const s3Client = new S3Client(s3Config);

export const fetchBuckets = async () => {
    console.log('o')
    console.log(s3Config)
    const result = await s3Client.send(new ListBucketsCommand({}));
    console.log('result :' + result)
    return result.Buckets?.map(bucket => bucket.Name!) || [];
};

export const fetchObjectsInBucket = async (bucketName: string, maxKeys: number, continuationToken?: string) => {
    const params: any = {
      Bucket: bucketName,
      MaxKeys: maxKeys
    };
    if (continuationToken) {
      params.ContinuationToken = continuationToken;
    }
    const result = await s3Client.send(new ListObjectsV2Command(params));
    return result;
};