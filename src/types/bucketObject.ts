export type BucketObject = {
    Key: string
    FullKey: string
    LastModified?: Date
    Size: number
    Files?: BucketObject[]
    emoji?: string,
    [key: string]: unknown
  }