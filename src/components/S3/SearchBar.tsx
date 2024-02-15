import React, { PropsWithChildren }  from 'react';
import { Box, Text } from 'ink'
import searchHook from '../../types/searchHook.js';
import TextInput from 'ink-text-input';

interface Props {
    search: searchHook
}


export default function SearchBar(props: PropsWithChildren<Props>) {
    return (
        <Box flexDirection='row'>
            <Text underline>Search : </Text>
            <TextInput focus={props.search.mode} value={props.search.input} onChange={props.search.apply} showCursor />
        </Box>
    )
}