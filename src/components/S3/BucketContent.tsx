import React, { PropsWithChildren } from 'react'
import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';
import { BucketObject } from '../../types/bucketObject.js';
import { Clipboard } from '../../types/clipboard.js'
import searchHook from '../../types/searchHook.js'
import SearchBar from './SearchBar.js';
import S3Help from './S3Help.js';

interface Props {
  paginatedObjects: BucketObject[];
  onSelect: (item: { value: string }) => void
  onHighLight: (item: {value: string}) => void
  title: string
  page: number
  totalPage: number
  clipboard: Clipboard
  highlight: BucketObject | null
  message? : string
  search: searchHook<BucketObject>
}

export default function BucketContent(props: PropsWithChildren<Props>) {
  
  const items = props.paginatedObjects.map((obj : BucketObject) => ({ 
    label: (obj.emoji || '') + ' ' + (obj.displayPath ? obj.FullKey : obj.Key), 
    value: obj.Key}))

  const highlightedDate: string =  props.highlight?.LastModified?.toLocaleString() ?? 'unknown'
  return (
  <Box flexDirection="row" gap={3}>
  <Box flexDirection='column'>
    <Box>
      <Text bold underline>Files in </Text>
      <Text bold underline color="whiteBright">{props.title} :</Text>
    </Box>
    <SearchBar search={props.search}/>
    <Box flexDirection="column" margin={1}>
      <SelectInput
        items={items}
        onSelect={props.onSelect}
        onHighlight={props.onHighLight}
        isFocused={!props.search.mode}
      />
    </Box>
    <Box>
      <Text>Page </Text>
      <Text bold color="greenBright">{props.page} </Text>
      <Text>on </Text>
      <Text bold color="greenBright">{props.totalPage}</Text>
    </Box>
    <Text>{props.message}</Text>
  </Box>
  <Box>

  </Box>
  <Box borderColor="green" borderStyle="round" marginLeft={2} paddingX={1} flexDirection='column'>
    <Text>
      Highlight : <Text underline>{props.highlight?.Key}</Text>
    </Text>
    <Text>Size : 
      <Text color="greenBright"> {props.highlight?.Size} </Text>
      o
    </Text>
    <Text>
      Last modified : 
      <Text color="blue"> {highlightedDate}</Text>
    </Text> 
  </Box>
  <Box borderColor="yellow" borderStyle="round" marginLeft={2} paddingX={1} flexDirection='column'>
    <Text>ClipBoard : {props.clipboard?.item ? props.clipboard.item.Key : ''}</Text>
  </Box>
  <S3Help searchMode={props.search.mode} />
  </Box>
)};
