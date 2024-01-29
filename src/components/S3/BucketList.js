import React from 'react';
import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';
const BucketList = ({ paginatedBuckets, onSelect }) => (
// <Box flexDirection="column" borderStyle="round" borderColor="red" width="200">
React.createElement(Box, { flexDirection: "column" },
    React.createElement(SelectInput, { items: paginatedBuckets.map((bucket) => ({ label: bucket, value: bucket })), onSelect: onSelect }),
    React.createElement(Box, { flexDirection: "column", justifyContent: "space-between" },
        React.createElement(Text, null, "Press 'p' or left arrow for Previous"),
        React.createElement(Text, null, "Press 'n' or right arrow for Next"))));
export default BucketList;
