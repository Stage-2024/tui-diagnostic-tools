import React, { PropsWithChildren }  from 'react';
import { Box, Text } from 'ink'
import searchHook from '../../types/searchHook.js';
import TextInput from 'ink-text-input';
import { BucketObject } from '../../types/bucketObject.js';

interface Props<T extends BucketObject | string> {
    search: searchHook<T>
}


export default function SearchBar<T extends BucketObject | string>(props: PropsWithChildren<Props<T>>) {
    return (
        <Box flexDirection='row'>
            <Text underline>Search : </Text>
            <TextInput focus={props.search.mode} value={props.search.input} onChange={props.search.apply} showCursor />
        </Box>
    )
}