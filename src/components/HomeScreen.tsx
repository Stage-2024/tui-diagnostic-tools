import React, { useState } from 'react';
import { Box, Key, Text, useInput } from 'ink';
import { registerScreen } from '../router/ScreenRegistry.js';
import Feature from '../types/feature.js';
import { useNavigation } from '../context/NavigationContext.js';
import { SwitchAction } from '../types/switchAction.js';
import Switch from '../types/switch.js';

// const HomeScreen = () => {

//     const { navigateTo } = useNavigation();

//     const handleInput = (input: string) => {
//         if (input === 'key.escape') {
//             navigateTo('home');      
//         }

//         if(input === 's') {
//             navigateTo('s3');
//         }

//         if(input === 'h') {
//             navigateTo('help');
//         }
//     }

//     useInput(handleInput);
//     return (
//         <Box>
//             <Text>K00S TUI Diagnostic Terminal</Text>
//             <Text>
//                 S3 TOOL (s)
//             </Text>
//             <Text> Help (h)</Text>
//         </Box>
//     );
// };

// export default HomeScreen;

// @Screen({ name: 'home', shortcut: 'h' })
//const { navigateTo } = useNavigation();
const HomeScreen = () => {
    const options: Feature[] =  [{display: 'HelpScreen', navigation: 'help'}, {display: 'S3Screen', navigation: 's3'}];
    const [selectedOption, setSelectedOption] = useState(0);
    const [search, setSearch] = useState('');
    const { navigateTo } = useNavigation();

    // Handle user input
    
    useInput((input: string, key: Key) => {
        
        setSearch((prev) => prev + input)
        let globalInput: string

        if (key.return) {
            // Enter key pressed, handle the selected option here
            globalInput = 'return'
        } else if (key.downArrow) {
            // Down arrow key pressed, move selection down
            globalInput = 'downArrow'
        } else if (key.upArrow) {
            // Up arrow key pressed, move selection up
            globalInput = 'upArrow'
        } else {
            globalInput = input
        }

        const inputs: Switch = {
            s: () => navigateTo('s3'),
            h: () => navigateTo('help'),
            return: () => navigateTo(options[selectedOption]?.navigation || 'home'),
            downArrow: () => setSelectedOption((prev) => (prev + 1) % options.length),
            upArrow: () => setSelectedOption((prev) => (prev - 1 + options.length) % options.length),
            default: () => null
        }

        const action: SwitchAction = inputs[globalInput] ?? inputs.default
        action()
    });
    
    return (
        <Box flexDirection='column'>
            <Box>
                <Text>Search: </Text>
                <Text color="cyan">{search}</Text>
            </Box>
            <Box flexDirection='column'>
                <Text>Select an option:</Text>
                {options.map((option, index) => (
                    <Text key={index} color={selectedOption === index ? 'green' : 'white'}>
                        {index + 1}. {option.display}
                    </Text>
                ))}
            </Box>
            <Box flexDirection='column' marginTop={1}>
                <Text color='blueBright'> K00S TUI Diagnostic Terminal</Text>
                <Text> S3 TOOL (s)  Help (h) </Text>
            </Box>
        </Box>
    );

};

const handleInput = (input: string, navigateTo: (screen: string) => void) => {
    /*
    if (input === 'key.return') {
        // Enter key pressed, handle the selected option here
        console.log('Selected:', options[selectedOption]?.navigation);
        navigateTo(options[selectedOption]?.navigation || 'home')
    }

    if (input === 'key.downArrow'){
        setSelectedOption((prev) => (prev + 1) % options.length);
    }
    */

    if (input === 'key.escape') {
        navigateTo('home');
    }

    if (input === 's') {
        navigateTo('s3');
    }

    if (input === 'h') {
        navigateTo('help');
    }
};

registerScreen({ name: 'home', shortcut: 'esc', Component: HomeScreen /*, handleInput */ });

export default HomeScreen;

// export default withScreenRegistration({ 
//     name: 'home', 
//     shortcut: 'esc',
//     handleInput: handleInput
// })(HomeScreen);
