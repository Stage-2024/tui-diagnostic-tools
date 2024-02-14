export interface BucketObject {
    Key: string
    FullKey: string
    LastModified?: Date
    Files?: BucketObject[]
    [key: string]: unknown
  }