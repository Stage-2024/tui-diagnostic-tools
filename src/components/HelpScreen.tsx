import React from 'react';
import { Box, Text} from 'ink';
import { registerScreen } from '../router/ScreenRegistry.js';
// import { useNavigation } from '../context/NavigationContext.js';

const HelpScreen = () => {
    return <Box flexDirection='column'>
                <Text>Help Information...</Text>
                <Text>Press Esc  to go to Home Screen.</Text>
                <Text color="magentaBright">S3 screen</Text>
                <Box flexDirection='column' marginLeft={1}>
                    <Text>Press 'p' or left arrow for Previous</Text>
                    <Text>Press 'n' or right arrow for Next</Text>
                </Box>
            </Box>
};

registerScreen({
    name: 'help',
    Component: HelpScreen,
    shortcut: 'h',
    // handleInput
});

export default HelpScreen;