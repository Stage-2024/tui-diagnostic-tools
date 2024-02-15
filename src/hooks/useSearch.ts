import { searchFilter } from "../utils/helper.js"
import { BucketObject } from "../types/bucketObject.js"
import { useState } from "react"
import searchHook from "../types/searchHook.js"

export const useSearch = (items: BucketObject[]): searchHook => {
    //const [results, setResults] = useState<BucketObject[]>(searchFilter('', items))
    const [searchMode, setSearchMode] = useState<boolean>(false)
    const [input, setInput] = useState<string>('')

    const apply = (filterKey: string) => {
        setInput(filterKey)
        //setResults(searchFilter(filterKey, items))
        return results
    }

    const toggle = () => {
        setSearchMode(!searchMode)
    }
    const results = searchFilter(input, items)
    return {
        results,
        apply,
        mode: searchMode,
        toggle,
        input
    }
}