import React from 'react';
import { Box } from 'ink';
import SelectInput from 'ink-select-input';

interface BucketListProps {
  paginatedBuckets: string[];
  onSelect: (item: { label: string }) => void;
}

const BucketList:  React.FC<BucketListProps> = ({ paginatedBuckets, onSelect }) => (
  <Box flexDirection="column" margin={1}>
    <SelectInput
      items={paginatedBuckets.map((bucket : string) => ({ label: bucket, value: bucket }))}
      onSelect={onSelect}
    />
  </Box>
);

export default BucketList;