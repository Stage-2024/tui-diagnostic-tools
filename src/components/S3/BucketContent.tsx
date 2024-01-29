import React from 'react';
import { Box, Text } from 'ink';

interface BucketObject {
  Key: string;
  [key: string]: any;
}

interface BucketContentProps {
  selectedBucket: string;
  objects: BucketObject[];
  currentPage: number;
  tokens: string[];
}

const BucketContent: React.FC<BucketContentProps> = ({ selectedBucket, objects, currentPage, tokens }) => (
  <Box flexDirection="column">
    <Text bold underline>Files in {selectedBucket}:</Text>
    
    <Box flexDirection="column" marginBottom={1}>
      {objects.map(obj => (
        <Box key={obj.Key}><Text>{obj.Key}</Text></Box>
      ))}
    </Box>

    <Box justifyContent="space-between">
      <Text>{currentPage === 0 ? ' ' : "Press 'p' or left arrow for Previous"}</Text>
      <Text>{currentPage >= tokens.length - 1 || tokens.length === 0 ? ' ' : "Press 'n' or right arrow for Next"}</Text>
    </Box>
  </Box>
);

export default BucketContent;
