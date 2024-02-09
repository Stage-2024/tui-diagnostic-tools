import React from 'react';
import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';
import { BucketObject } from '../../types/bucketObject.js';

interface BucketContentProps {
  paginatedObjects: BucketObject[];
  onSelect: (item: { label: string }) => void;
}

const BucketContent: React.FC<BucketContentProps> = ({ paginatedObjects, onSelect }) => {
  const items = paginatedObjects.map((obj : BucketObject) => ({ label: obj.Key, value: obj.Key}));
  return (
  <Box flexDirection="column" margin={1}>
    <SelectInput
      items={items}
      onSelect={onSelect}
    />
  </Box>
)};

export default BucketContent;
