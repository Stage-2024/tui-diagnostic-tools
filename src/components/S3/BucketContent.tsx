import React from 'react';
import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';
import { BucketObject } from '../../types/bucketObject.js';

interface BucketContentProps {
  paginatedObjects: BucketObject[];
  onSelect: (item: { label: string }) => void;
  title: string
  page: number
  totalPage: number
}

const BucketContent: React.FC<BucketContentProps> = ({ paginatedObjects, onSelect, title, page, totalPage }) => {
  const items = paginatedObjects.map((obj : BucketObject) => ({ label: obj.Key, value: obj.Key}));
  return (
  <Box flexDirection='column'>
    <Box>
      <Text bold underline>Files in </Text>
      <Text bold underline color="whiteBright">{title} :</Text>
    </Box>
    <Box flexDirection="column" margin={1}>
      <SelectInput
        items={items}
        onSelect={onSelect}
      />
    </Box>
    <Box>
      <Text>Page </Text>
      <Text bold color="greenBright">{page} </Text>
      <Text>on </Text>
      <Text bold color="greenBright">{totalPage}</Text>
    </Box>
    <Box marginTop={1} flexDirection="column" justifyContent="space-between">
      <Text>Press 'p' or left arrow for Previous</Text>
      <Text>Press 'n' or right arrow for Next</Text>
    </Box>
  </Box>
)};

export default BucketContent;
