import React, { PropsWithChildren } from 'react';
import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';
import searchHook from '../../types/searchHook.js';
import SearchBar from './SearchBar.js';

interface Props {
  paginatedBuckets: string[];
  onSelect: (item: { value: string }) => void;
  page: number
  totalPage: number
  search: searchHook<string>
}

export default function BucketList(props: PropsWithChildren<Props>){ 

  return (
    <Box flexDirection='column'>
      <Text bold underline>Select a bucket :</Text>
      <SearchBar search={props.search}/>
      <Box flexDirection="column" margin={1}>
        <SelectInput
          items={props.paginatedBuckets.map((bucket : string) => ({ label: '🥛 ' + bucket, value: bucket }))}
          onSelect={props.onSelect}
        />
      </Box>
      <Box>
        <Text>Page </Text>
        <Text bold color="greenBright">{props.page} </Text>
        <Text>on </Text>
        <Text bold color="greenBright">{props.totalPage}</Text>
      </Box>
    </Box>
  );
}