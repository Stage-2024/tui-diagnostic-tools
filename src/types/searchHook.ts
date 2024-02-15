import { BucketObject } from "./bucketObject.js"

export default interface searchHook<T extends BucketObject | String> {
    results: T[]
    apply: (filterKey: string) => T[]
    mode: boolean
    toggle: () => void
    input: string,
}
