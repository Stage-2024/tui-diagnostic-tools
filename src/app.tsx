import React, { useState, useEffect } from 'react';
import { NavigationProvider } from './context/NavigationContext.js';
import ScreenRouter from './router/ScreenRouter.js';
import HomeScreen from './components/HomeScreen.js';
import HelpScreen from './components/HelpScreen.js';
import S3Screen from './components/S3/S3Screen.js';
import { Box, Text } from 'ink';

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

    const [color, setColor] = useState('blue');

    useEffect(() => {
        const rainbowColors: string[] = [
            '#ff0000', '#ff4000', '#ff8000', '#ffbf00',
            '#ffd700', '#ffff00', '#ffbf00', '#ff8000',
            '#ff4000', '#ff0000', '#ff0040', '#ff0080',
            '#ff00bf', '#ff00ff', '#bf00ff', '#8000ff',
            '#4000ff', '#0000ff', '#0040ff', '#0080ff',
            '#00bfff', '#00ffff', '#00ffbf', '#00ff80',
            '#00ff40', '#00ff00', '#40ff00', '#80ff00',
            '#bfff00', '#ffff00', '#ffbf00', '#ff8000',
            '#ff4000', '#ff0000'
          ]; //thx chatgpt

        let colorIndex = 0
		const timer = setInterval(() => {
			setColor(rainbowColors[colorIndex] ?? 'black');
            colorIndex = (colorIndex + 1) % rainbowColors.length
		}, 50);

		return () => {
			clearInterval(timer);
		};
	}, []);

    return (
        <Box flexDirection="column">
            <Box borderStyle="round" borderColor="blue" padding={1}>
                <Text bold color={process.env['DEBUG'] ? "greenBright" : color}>
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

