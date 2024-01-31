import React from 'react';
// import { Box, Text, useInput } from 'ink';
import { Box, Text} from 'ink';
import { registerScreen } from '../router/ScreenRegistry';
// import { useNavigation } from '../context/NavigationContext.js';

const HelpScreen = () => {

    // const { navigateTo } = useNavigation();


    // useInput(handleInput);

    // Help screen specific logic and UI
    return <Box flexDirection='column'>
                <Text>Help Information...</Text>
                <Text>Press Esc  to go to Home Screen.</Text>
            </Box>
};

// const handleInput = (input: string) => {
//     if (input === 'key.escape') {
//         console.log('Esc pressed')
//         navigateTo('home');      
//     }
// };


// export default withScreenRegistration({ 
//     name: 'help', 
//     shortcut: 'h',
//     // handleInput
// })(HelpScreen);

registerScreen({
    name: 'help',
    Component: HelpScreen,
    shortcut: 'h',
    // handleInput
});

export default HelpScreen;