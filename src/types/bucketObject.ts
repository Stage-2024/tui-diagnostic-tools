export type BucketObject = {
    Key: string
    FullKey: string
    LastModified?: Date
    Size: number
    Files?: BucketObject[]
    emoji?: string,
    displayPath? : boolean
    [key: string]: unknown
  }