import React from 'react';
import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';
import { BucketObject } from '../../types/bucketObject.js';
import { Clipboard } from '../../types/clipboard.js'

interface BucketContentProps {
  paginatedObjects: BucketObject[];
  onSelect: (item: { label: string }) => void;
  onHighLight: (item: {label: string}) => void;
  title: string
  page: number
  totalPage: number
  clipboard: Clipboard
  highlight: BucketObject | null
  message? : string
}

const BucketContent: React.FC<BucketContentProps> = ({ paginatedObjects, onSelect, onHighLight, title, page, totalPage, clipboard, highlight, message }) => {
  
  const items = paginatedObjects.map((obj : BucketObject) => ({ label: obj.Key, value: obj.Key}))

  return (
  <Box flexDirection="row" gap={4}>
  <Box flexDirection='column'>
    <Box>
      <Text bold underline>Files in </Text>
      <Text bold underline color="whiteBright">{title} :</Text>
    </Box>
    <Box flexDirection="column" margin={1}>
      <SelectInput
        items={items}
        onSelect={onSelect}
        onHighlight={onHighLight}
      />
    </Box>
    <Box>
      <Text>Page </Text>
      <Text bold color="greenBright">{page} </Text>
      <Text>on </Text>
      <Text bold color="greenBright">{totalPage}</Text>
    </Box>
    <Text>{message}</Text>
  </Box>
  <Box>

  </Box>
  <Box borderColor="green" borderStyle="round" marginLeft={2} paddingX={1} flexDirection='column'>
    <Text>
      Highlight : <Text underline>{highlight?.Key}</Text>
    </Text>
    {highlight?.Size && 
      <Text>Size : 
        <Text color="greenBright"> {highlight?.Size} </Text>
        o
      </Text>
    }  
  </Box>
  <Box borderColor="yellow" borderStyle="round" marginLeft={2} paddingX={1} flexDirection='column'>
    <Text>ClipBoard : {clipboard?.item ? clipboard.item.Key : ''}</Text>
  </Box>
  
  <Box flexDirection='column'>
      <Text>Press 'd' to download the object</Text>
      <Text>Press 'c' to copy an object</Text>
      <Text>Press 'v' to past an object</Text>
      <Text>Press 'r' to refresh</Text>
    </Box>
  </Box>
)};

export default BucketContent;
