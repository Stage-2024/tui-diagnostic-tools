import React, { useState } from 'react';
import { NavigationProvider } from './context/NavigationContext.js';
import ScreenRouter from './router/ScreenRouter.js';
import HomeScreen from './components/HomeScreen.js';
import HelpScreen from './components/HelpScreen.js';
import S3Screen from './components/S3/S3Screen.js';
import { Box, Text, useInput } from 'ink';

let registerScreen = [HomeScreen, HelpScreen, S3Screen]; // hack for now to trigger registry of screens

const App = () => {
    /*
    const options =  registerScreen.map(a => a.name);
    const [selectedOption, setSelectedOption] = useState(0);
    const [search, setSearch] = useState('');

    // Handle user input
    useInput((input, key) => {
        if (key.return) {
            // Enter key pressed, handle the selected option here
            console.log('Selected:', options[selectedOption]);
        } else if (key.downArrow) {
            // Down arrow key pressed, move selection down
            setSelectedOption((prev) => (prev + 1) % options.length);
        } else if (key.upArrow) {
            // Up arrow key pressed, move selection up
            setSelectedOption((prev) => (prev - 1 + options.length) % options.length);
        } else if (input) {
            setSearch((prev) => prev + input);
        }
    });
    */

    return (
        <Box flexDirection="column">
            <Box borderStyle="round" borderColor="blue" padding={1}>
                <Text bold color="blue">
                    K00S TUI Diagnostic Terminal
                </Text>
            </Box>
            <Box flexGrow={1} marginTop={1} borderStyle="round" borderColor="blue" padding={1}>
                <NavigationProvider>
                    <ScreenRouter />
                </NavigationProvider>
            </Box>
        </Box>
    );
};

export default App;

