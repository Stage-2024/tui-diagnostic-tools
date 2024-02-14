import { BucketObject } from "./bucketObject.js";

export type Clipboard = null | {
    item: BucketObject
    bucket: string
}