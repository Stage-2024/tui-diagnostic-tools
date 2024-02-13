import { BucketObject } from "./bucketObject.js";

export type ClipBoard = null | {
    item: BucketObject
    bucket: string
}