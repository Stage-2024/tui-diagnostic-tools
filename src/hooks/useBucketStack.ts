import { useState, useEffect } from 'react'
import { BucketObject } from '../types/bucketObject.js'

export const useBucketStack = () => {
    const [items, setItems] = useState<BucketObject[]>([]);

    const push = (bucketObject: BucketObject) => {
        setItems([...items, bucketObject])
        return { items, push, pop }
    }

    const pop = (): BucketObject | null => {
        const poped: BucketObject | null = items[items.length - 1] || null
        setItems(items.slice(0, -1))
        return poped
    }

    return {
        items,
        push,
        pop
    }
}