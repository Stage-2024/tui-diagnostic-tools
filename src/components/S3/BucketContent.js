import React from 'react';
import { Box, Text } from 'ink';
const BucketContent = ({ selectedBucket, objects, currentPage, tokens }) => (React.createElement(Box, { flexDirection: "column" },
    React.createElement(Text, { bold: true, underline: true },
        "Files in ",
        selectedBucket,
        ":"),
    React.createElement(Box, { flexDirection: "column", marginBottom: 1 }, objects.map(obj => (React.createElement(Box, { key: obj.Key },
        React.createElement(Text, null, obj.Key))))),
    React.createElement(Box, { justifyContent: "space-between" },
        React.createElement(Text, null, currentPage === 0 ? ' ' : "Press 'p' or left arrow for Previous"),
        React.createElement(Text, null, currentPage >= tokens.length - 1 || tokens.length === 0 ? ' ' : "Press 'n' or right arrow for Next"))));
export default BucketContent;
