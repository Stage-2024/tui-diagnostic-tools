import { BucketObject } from "./bucketObject.js"

export default interface searchHook {
    results: BucketObject[]
    apply: (filterKey: string) => BucketObject[]
    mode: boolean
    toggle: () => void
    input: string,
}
