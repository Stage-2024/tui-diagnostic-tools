import React from 'react';
import BucketList from './BucketList';
import BucketContent from './BucketContent';
import {Box, Text} from 'ink';

import { useInput } from 'ink';
import { useS3 } from '../../hooks/useS3';
// import withScreenRegistration from '../../router/withScreenRegistration.js';
import { registerScreen } from '../../router/ScreenRegistry';

const S3Screen = () => {

    const itemsPerBucketPage = 10;
    const itemsPerObjectPage = 10;

    const {
        selectedBucket,
        buckets,
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