import React from 'react';
import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';

interface BucketListProps {
  paginatedBuckets: string[];
  onSelect: (item: { label: string }) => void;
  page: number
  totalPage: number
}

const BucketList:  React.FC<BucketListProps> = ({ paginatedBuckets, onSelect, page, totalPage }) => (
  <Box flexDirection='column'>
    <Text bold underline>Select a bucket :</Text>
    <Box flexDirection="column" margin={1}>
      <SelectInput
        items={paginatedBuckets.map((bucket : string) => ({ label: bucket, value: bucket }))}
        onSelect={onSelect}
      />
    </Box>
    <Box>
      <Text>Page </Text>
      <Text bold color="greenBright">{page} </Text>
      <Text>on </Text>
      <Text bold color="greenBright">{totalPage}</Text>
    </Box>
  </Box>
  
);

export default BucketList;