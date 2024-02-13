import React, { PropsWithChildren } from 'react';
import { Box, Text } from 'ink';
import Spinner from 'ink-spinner';
import { Message } from '../../types/message.js';

type Props = {
    message: Message
    highlight?: string
}

export default function DisplayMessage(props: PropsWithChildren<Props>) {

    return (
        <Box marginX={1} marginTop={1}>
            {props.message?.loader && <Text color="greenBright"><Spinner type='dots4'/> </Text>}
            {props.message?.content?.map((element) => {
                if(element.highlight){
                    return <Text underline color={props.highlight}>{element.text}</Text>
                } else {
                    return <Text>{element.text}</Text>
                }
                
            })}
            {props.children}
        </Box>
    )
}