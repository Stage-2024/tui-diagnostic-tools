export interface BucketObject {
    Key: string
    LastModified?: Date
    Files?: BucketObject[]
    [key: string]: unknown
  }