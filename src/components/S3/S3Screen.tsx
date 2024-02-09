import React, { useState } from 'react';
import BucketList from './BucketList.js';
import BucketContent from './BucketContent.js';
import {Box, Text, useInput} from 'ink';
import { useS3 } from '../../hooks/useS3.js';
// import withScreenRegistration from '../../router/withScreenRegistration.js';
import { registerScreen } from '../../router/ScreenRegistry.js';
import { useNavigation } from '../../context/NavigationContext.js';

const S3Screen = () => {

    const { navigateTo } = useNavigation();
    const s3 = useS3({itemsPerBucketPage: 10, itemsPerObjectPage: 10});

    // Handling keyboard input for pagination
    useInput((input, key) => {
        if (input === 'n' || key.rightArrow) {
            if (!s3.selectedBucket) {
                s3.handleBucketNextPage();
            } else {
                s3.nextPage();
            }
        }

        if (input === 'p' || key.leftArrow) {
            if (!s3.selectedBucket) {
                s3.handleBucketPrevPage();
            } else {
                //console.log(s3.objects)
                s3.prevPage();
            }
        }

        if(input === 'b'){
            s3.setSelectedBucket(null)
            navigateTo('s3')
        }
    });

    if (!s3.selectedBucket) {
        return (
            <Box flexDirection='column'>
                <Text bold underline>Select a bucket :</Text>
                <BucketList
                paginatedBuckets={s3.buckets}
                onSelect={({ label }: { label: string }) => s3.setSelectedBucket(label)}
                />
                <Box>
                    <Text>Page </Text>
                    <Text bold color="greenBright">{s3.bucketPage} </Text>
                    <Text>on </Text>
                    <Text bold color="greenBright">{s3.nbBucketPage}</Text>
                </Box>
                <Box marginTop={1} flexDirection="column" justifyContent="space-between">
                    <Text>Press 'p' or left arrow for Previous</Text>
                    <Text>Press 'n' or right arrow for Next</Text>
                </Box>
            </Box>
        );
    }

    return (
        <Box flexDirection='column'>
            <Box>
                <Text bold underline>Files in </Text>
                <Text bold underline color="yellowBright">{s3.selectedBucket} :</Text>
            </Box>
            <BucketContent
                paginatedObjects={s3.objects}
                onSelect={({}: {}) => null}
            />
            <Box>
                <Text>Page </Text>
                <Text bold color="greenBright">{s3.currentPage} </Text>
                <Text>on </Text>
                <Text bold color="greenBright">{s3.nbObjectPage}</Text>
            </Box>
            <Box marginTop={1} flexDirection="column" justifyContent="space-between">
                    <Text>Press 'p' or left arrow for Previous</Text>
                    <Text>Press 'n' or right arrow for Next</Text>
            </Box>
        </Box>
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