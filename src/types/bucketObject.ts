export interface BucketObject {
    Key: string
    FullKey: string
    LastModified?: Date
    Size: number
    Files?: BucketObject[]
    [key: string]: unknown
  }