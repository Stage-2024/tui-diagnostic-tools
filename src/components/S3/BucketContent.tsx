import React from 'react';
import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';

interface BucketObject {
  Key: string;
  [key: string]: unknown;
}

interface BucketContentProps {
  paginatedObjects: BucketObject[];
  onSelect: (item: { label: string, value: string }) => void;
}

const BucketContent: React.FC<BucketContentProps> = ({ paginatedObjects, onSelect }) => (
  <Box flexDirection="column" margin={1}>
    <SelectInput
      items={paginatedObjects.map((obj : BucketObject) => ({ label: obj.Key, value: obj.Key }))}
      onSelect={onSelect}
    />
  </Box>
);

export default BucketContent;
