import React, { PropsWithChildren } from "react"
import {Box, Text} from 'ink'

interface Props {
    searchMode: boolean
}

export default function S3Help(props: PropsWithChildren<Props>){
    return (
        <Box flexDirection='column'>
        {(() => {
          if(props.searchMode){
            return ( 
              <Box flexDirection="column">
                <Text>Search Mode : press any key to search </Text>
                <Text>Any arrow to exit</Text>
              </Box>
            )
          } else {
            return (
              <Box flexDirection='column'>
                <Text>Press 'b' to go to previous folder</Text>
                <Text>Press 'd' to download the object</Text>
                <Text>Press 'c' to copy an object</Text>
                <Text>Press 'v' to past an object</Text>
                <Text>Press 'r' to refresh</Text>
                <Text>Press 's' to search</Text>
                <Text>Press 'x' to delete an object</Text>
              </Box>
            )
          }
        })()}
        </Box>
    )
}