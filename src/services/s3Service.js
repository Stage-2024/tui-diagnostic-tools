var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { S3Client, ListBucketsCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { s3Config } from '../config/index.js';
export const s3Client = new S3Client(s3Config);
export const fetchBuckets = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield s3Client.send(new ListBucketsCommand({}));
    return ((_a = result.Buckets) === null || _a === void 0 ? void 0 : _a.map(bucket => bucket.Name)) || [];
});
export const fetchObjectsInBucket = (bucketName, maxKeys, continuationToken) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        Bucket: bucketName,
        MaxKeys: maxKeys
    };
    if (continuationToken) {
        params.ContinuationToken = continuationToken;
    }
    const result = yield s3Client.send(new ListObjectsV2Command(params));
    return result;
});
