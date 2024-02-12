import React from 'react';
import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';
import { BucketObject } from '../../types/bucketObject.js';
import { ClipBoard } from '../../types/clipBoard.js';

interface BucketContentProps {
  paginatedObjects: BucketObject[];
  onSelect: (item: { label: string }) => void;
  onHighLight: (item: {label: string}) => void;
  title: string
  page: number
  totalPage: number
  clipBoard: ClipBoard
  message? : string
}

const BucketContent: React.FC<BucketContentProps> = ({ paginatedObjects, onSelect, onHighLight, title, page, totalPage, clipBoard, message }) => {
  const items = [{label: '', value: ''}, ...paginatedObjects.map((obj : BucketObject) => ({ label: obj.Key, value: obj.Key}))]
  return (
  <Box flexDirection="row" justifyContent="space-between">
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
  <Box borderColor="greenBright" borderStyle="round" marginLeft={2} paddingX={1} flexDirection='column'>
    <Box borderTopColor="yellowBright" borderStyle="single">
      <Text>Press 'd' to download the object</Text>
    </Box>
    <Text>ClipBoard : {clipBoard.item ? clipBoard.item.Key : ''}</Text>
  </Box>
  </Box>
)};

export default BucketContent;
