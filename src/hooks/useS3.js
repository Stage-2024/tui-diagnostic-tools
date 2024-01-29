var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState, useEffect } from 'react';
export const useS3 = (initialBucket) => {
    const [buckets, setBuckets] = useState([]);
    const [objects, setObjects] = useState([]);
    const [tokens, setTokens] = useState([]);
    // ... Initialize S3Client here ...
    useEffect(() => {
        // ... Your fetchBuckets logic ...
    }, []);
    const fetchObjectsInBucket = (bucketName, continuationToken) => __awaiter(void 0, void 0, void 0, function* () {
        // ... Your fetchObjectsInBucket logic ...
    });
    useEffect(() => {
        if (initialBucket) {
            // ... Your fetchObjectsInBucket useEffect logic ...
        }
    }, [initialBucket]);
    return { buckets, objects, tokens, fetchObjectsInBucket };
};
