import React, { useState } from 'react';
import BucketList from './BucketList.js';
import BucketContent from './BucketContent.js';
import DisplayMessage from './DisplayMessage.js';
import {Box, Text, useInput} from 'ink';
import { useS3 } from '../../hooks/useS3.js';
import { usePagination } from '../../hooks/usePagination.js';
import { useClipboard } from '../../hooks/useClipboard.js';
import { registerScreen } from '../../router/ScreenRegistry.js';
import { useNavigation } from '../../context/NavigationContext.js';
import { getBucketObject } from '../../utils/helper.js';
import { BucketObject } from '../../types/bucketObject.js';
import { TODO } from '../../types/todo.js';
import { useBucketStack } from '../../hooks/useBucketStack.js';
import { useInfo } from '../../hooks/useInfo.js';
import { useSearch } from '../../hooks/useSearch.js';

const S3Screen = () => {
    
    //hooks
    const { navigateTo } = useNavigation()
    const s3 = useS3()
    const clipboard = useClipboard()
    const stack = useBucketStack()
    const search = useSearch<BucketObject>(s3.selectedObject?.Files || s3.objects)
    const bucketSearch = useSearch<string>(s3.buckets)
    //const folderSearch = useSearch(s3.selectedObject?.Files || [])
    const paginatedBuckets = usePagination<string>(10, bucketSearch.results)
    const paginatedObjects = usePagination<BucketObject>(10, search.results)
    //const paginatedFoldersObjects = usePagination<BucketObject>(10, search.results)
    const info = useInfo()

    // Handling keyboard input for pagination
    useInput((input, key) => {
        //!s3.selectedObject && !search.mode || s3.selectedObject && folderSearch.mode || s3.selectedBucket
        if(!search.mode && !bucketSearch.mode){
            if (input === 'n' || key.rightArrow) {
                if (!s3.selectedBucket) {
                    paginatedBuckets.nextPage()
                } else {
                    //console.log(s3.objects)
                    paginatedObjects.nextPage()
                }
            }

            if (input === 'p' || key.leftArrow) {
                if (!s3.selectedBucket) {
                    paginatedBuckets.prevPage()
                } else {
                    paginatedObjects.prevPage()
                }
            }

            if(input === 'b'){ // Go Back
                if(s3.selectedObject){
                    s3.setSelectedObject(stack.pop())
                    s3.setHighlightedObject(null)
                } else {
                    s3.setSelectedBucket(null)
                    s3.setSelectedObject(null)
                    navigateTo('s3')
                }

                search.apply('')
            }

            if(input === 'c'){ // Copy
                if(s3.highlightedObject && s3.selectedBucket){
                    clipboard.setValue({item: s3.highlightedObject, bucket: s3.selectedBucket})
                }
            }

            if(input === 'v'){ // Paste

                if(clipboard.value && s3.selectedBucket){ // Should paste in a bucket with something in the clipboard
                    if((s3.selectedObject?.Files || !s3.selectedObject) && !clipboard.value?.item.Files){
                        info.setMessage({
                            content: [
                                {
                                    text: "Ajout de l'objet "
                                },
                                {
                                    text: clipboard.value?.item.Key,
                                    highlight: true
                                },
                                {
                                    text: " dans le répertoire "
                                },
                                {
                                    text: s3.selectedBucket,
                                    highlight: true
                                }
                            ],
                            loader: 'flip'
                        })
                        s3.addObject(clipboard.value, s3.selectedBucket, s3.selectedObject?.FullKey ?? s3.selectedObject?.Key).then(() => {
                            info.setMessage({
                                content: [{text: "objet copié avec succès"}]
                            })
                            s3.refresh()
                        })
                    }

                }

            }

            if(input === 'd'){ // Download

                if(s3.highlightedObject && s3.selectedBucket && !s3.highlightedObject.Files){
                    info.setMessage({
                        content: [
                            {
                                text: "Téléchargement...",
                            }
                        ],
                        loader: 'dots4'
                    })
                    s3.downloadObject(s3.highlightedObject.FullKey ?? s3.highlightedObject.Key, s3.selectedBucket).then((message) => {
                        info.setMessage(message)
                    })
                }

            }

            if(input === 'r'){ // Refresh
                info.setMessage({
                    content:[{text:"Rafraîchissement de la liste des fichiers..."}],
                    loader: 'dots'
                })

                s3.refresh().then(() => info.setMessage({
                    content:[{text:'Liste des fichiers rafraîchie.'}]
                }))
            }

            if(input === 't'){ // Debug
                console.log(stack.items)
            }

            if(input === 's'){
                search.toggle()
                bucketSearch.toggle()
            }

        } else {
            if(key.downArrow || key.upArrow || key.leftArrow || key.rightArrow || key.escape){
                search.toggle()
                bucketSearch.toggle()
            }

            if(input === "q"){
                null
            }
        }
    });

    if (!s3.selectedBucket) {
        return (
            <BucketList
                paginatedBuckets={paginatedBuckets.items}
                onSelect={({ value }: { value: string }) => {
                    s3.setSelectedBucket(value)
                    search.apply('')
                }}
                page={paginatedBuckets.page}
                totalPage={paginatedBuckets.pageCount}
                search={bucketSearch}
            />
        );
    }

    if (!s3.selectedObject){
        return (
            <Box flexDirection='column'>
                <BucketContent
                    title={s3.selectedBucket}
                    page={paginatedObjects.page}
                    totalPage={paginatedObjects.pageCount}
                    paginatedObjects={paginatedObjects.items}
                    clipboard={clipboard.value}
                    highlight={s3.highlightedObject}
                    search={search}
                    onSelect={({ value }: { value: string}) => {
                        const object: BucketObject | void = getBucketObject(value, paginatedObjects.items)
                        object && s3.setSelectedObject(object) 
                        object && object.Files?[0] && s3.setHighlightedObject(object.Files[0] || object) : null;
                        info.setMessage(null)
                        search.apply('')
                    }}
                    onHighLight={({ value }: { value: string}) => {
                        const object: BucketObject | void = getBucketObject(value, paginatedObjects.items)
                        object && s3.setHighlightedObject(object)
                    }}
                />
                <DisplayMessage message={info.message} highlight='yellowBright'></DisplayMessage>
            </Box>
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
        <Box flexDirection='column'>
            <BucketContent
                title={s3.selectedObject.Key}
                page={paginatedObjects.page}
                totalPage={paginatedObjects.pageCount}
                paginatedObjects={paginatedObjects.items}
                clipboard={clipboard.value}
                highlight={s3.highlightedObject}
                search={search}
                onSelect={({ value }: { value: string}) => {
                    const object: BucketObject | void = getBucketObject(value, paginatedObjects.items)
                    s3.selectedObject && stack.push(s3.selectedObject)
                    object && s3.setSelectedObject(object)
                    info.setMessage(null)
                    search.apply('')
                }}
                onHighLight={({ value }: { value: string}) => {
                    const object: BucketObject | void = getBucketObject(value, paginatedObjects.items)
                    object && s3.setHighlightedObject(object)
                }}
            />
            <DisplayMessage message={info.message} highlight='yellowBright'></DisplayMessage>
        </Box>
    );


}

registerScreen({
    name: 's3',
    Component: S3Screen,
    shortcut: 's',
    // handleInput
});
export default S3Screen;