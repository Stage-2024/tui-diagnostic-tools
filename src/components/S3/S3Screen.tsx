import React, { useState } from 'react';
import BucketList from './BucketList.js';
import BucketContent from './BucketContent.js';
import {Box, Text, useInput} from 'ink';
import { useS3 } from '../../hooks/useS3.js';
import { usePagination } from '../../hooks/usePagination.js';
import { useClipBoard } from '../../hooks/useClipBoard.js';
// import withScreenRegistration from '../../router/withScreenRegistration.js';
import { registerScreen } from '../../router/ScreenRegistry.js';
import { useNavigation } from '../../context/NavigationContext.js';
import { getBucketObject } from '../../utils/helper.js';
import { BucketObject } from '../../types/bucketObject.js';
import { TODO } from '../../types/todo.js';

const S3Screen = () => {
    const { navigateTo } = useNavigation()
    const s3 = useS3()
    const clipboard = useClipBoard()
    const paginatedBuckets = usePagination<string>(10, s3.buckets)
    const paginatedObjects = usePagination<BucketObject>(10, s3.objects)
    const paginatedFoldersObjects = usePagination<BucketObject>(10, s3.selectedObject?.Files || [])

    // Handling keyboard input for pagination
    useInput((input, key) => {
        if (input === 'n' || key.rightArrow) {
            if (!s3.selectedBucket) {
                paginatedBuckets.nextPage()
            } else if(!s3.selectedObject) {
                //console.log(s3.objects)
                paginatedObjects.nextPage()
            } else {
                paginatedFoldersObjects.nextPage()
            }
        }

        if (input === 'p' || key.leftArrow) {
            if (!s3.selectedBucket) {
                paginatedBuckets.prevPage()
            } else if(!s3.selectedObject) {
                //console.log(s3.objects)
                paginatedObjects.prevPage()
            } else {
                paginatedFoldersObjects.prevPage()
            }
        }

        if(input === 'b'){
            if(s3.selectedObject){
                s3.setSelectedObject(null)
                s3.setHighlightedObject(null)
            } else {
                s3.setSelectedBucket(null)
                s3.setSelectedObject(null)
                navigateTo('s3')
            }
        }

        if(input === 'c'){
            s3.highlightedObject ? clipboard.setValue({item: s3.highlightedObject}) : null
        }

        if(input === 'd'){
            if(s3.highlightedObject && s3.selectedBucket){
                s3.downloadObject(s3.highlightedObject.FullKey ?? 'aaa', s3.selectedBucket)
            }
        }
    });

    if (!s3.selectedBucket) {
        return (
            <BucketList
                paginatedBuckets={paginatedBuckets.items}
                onSelect={({ label }: { label: string }) => s3.setSelectedBucket(label)}
                page={paginatedBuckets.page}
                totalPage={paginatedBuckets.pageCount}
            />
        );
    }

    if (!s3.selectedObject){
        return (
            <BucketContent
                title={s3.selectedBucket}
                page={paginatedObjects.page}
                totalPage={paginatedObjects.pageCount}
                paginatedObjects={paginatedObjects.items}
                clipBoard={clipboard.value}
                onSelect={({ label }: { label: string}) => {
                    const object: BucketObject | void = getBucketObject(label, paginatedObjects.items)
                    object && s3.setSelectedObject(object)
                    s3.setHighlightedObject({Key: ''})
                }}
                onHighLight={({ label }: { label: string}) => {
                    const object: BucketObject | void = getBucketObject(label, paginatedObjects.items)
                    object && s3.setHighlightedObject(object)
                }}
            />
        );
    }

    if (!s3.selectedObject.Files){
        return (
            <Box>
                <Text>Selected file : {s3.selectedObject.Key}</Text>
            </Box>
        )
    }

    return (
        <BucketContent
            title={s3.selectedObject.Key}
            page={paginatedFoldersObjects.page}
            totalPage={paginatedFoldersObjects.pageCount}
            paginatedObjects={paginatedFoldersObjects.items}
            clipBoard={clipboard.value}
            onSelect={({}: {}) => null}
            onHighLight={({ label }: { label: string}) => {
                const object: BucketObject | void = getBucketObject(label, paginatedFoldersObjects.items)
                object && s3.setHighlightedObject(object)
            }}
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