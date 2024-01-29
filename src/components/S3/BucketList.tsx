import React from 'react';
import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';

interface BucketListProps {
  paginatedBuckets: string[];
  onSelect: (item: { label: string, value: string }) => void;
}

const BucketList:  React.FC<BucketListProps> = ({ paginatedBuckets, onSelect }) => (
  // <Box flexDirection="column" borderStyle="round" borderColor="red" width="200">
  <Box flexDirection="column">
    <SelectInput
      items={paginatedBuckets.map((bucket : string) => ({ label: bucket, value: bucket }))}
      onSelect={onSelect}
    />
    <Box flexDirection="column" justifyContent="space-between">
      <Text>Press 'p' or left arrow for Previous</Text>
      <Text>Press 'n' or right arrow for Next</Text>
    </Box>
  </Box>
);

export default BucketList;