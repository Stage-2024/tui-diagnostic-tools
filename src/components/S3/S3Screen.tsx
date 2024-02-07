import React, { useState } from 'react';
import BucketList from './BucketList.js';
import BucketContent from './BucketContent.js';
import {Box, Text, useInput} from 'ink';
import { useS3 } from '../../hooks/useS3.js';
// import withScreenRegistration from '../../router/withScreenRegistration.js';
import { registerScreen } from '../../router/ScreenRegistry.js';

const S3Screen = () => {

    const itemsPerBucketPage: number = 2;
    const itemsPerObjectPage: number = 10;

    const {
        selectedBucket,
        buckets,
        bucketPage,
        nbBucketPage,
        setSelectedBucket,
        objects,
        nextPage,
        prevPage,
        currentPage,
        tokens,
        handleBucketNextPage,
        handleBucketPrevPage,
    } = useS3(itemsPerBucketPage, itemsPerObjectPage);

    // Handling keyboard input for pagination
    useInput((input, key) => {
        if (input === 'n' || key.rightArrow) {
            if (!selectedBucket) {
                handleBucketNextPage();
            } else {
                nextPage();
            }
        }

        if (input === 'p' || key.leftArrow) {
            if (!selectedBucket) {
                handleBucketPrevPage();
            } else {
                prevPage();
            }
        }
    });

    if (!selectedBucket) {
        return (
            <Box flexDirection='column'>
                <Text>Select a bucket :</Text>
                <BucketList
                paginatedBuckets={buckets}
                onSelect={({ value }: { value: string }) => setSelectedBucket(value)}
                />
                <Box>
                    <Text>Page </Text>
                    <Text bold color="greenBright">{bucketPage} </Text>
                    <Text>on </Text>
                    <Text bold color="greenBright">{nbBucketPage}</Text>
                </Box>
                <Box marginTop={1} flexDirection="column" justifyContent="space-between">
                    <Text>Press 'p' or left arrow for Previous</Text>
                    <Text>Press 'n' or right arrow for Next</Text>
                </Box>
            </Box>
        );
    }

    return (
        <BucketContent
            selectedBucket={selectedBucket}
            objects={objects}
            currentPage={currentPage}
            tokens={tokens}
        />
    );
}


// export default withScreenRegistration({ 
//     name: 's3', 
//     shortcut: 's',
// //    handleInput: 
// })(S3Screen);


registerScreen({
    name: 's3',
    Component: S3Screen,
    shortcut: 's',
    // handleInput
});
export default S3Screen;