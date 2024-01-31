import React from 'react';
import { Box, Text} from 'ink';
import { registerScreen } from '../router/ScreenRegistry';

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
const HomeScreen = () => {
    return (
        <Box flexDirection='column'>
            <Text color='blueBright'> K00S TUI Diagnostic Terminal</Text>
            <Text> S3 TOOL (s)  Help (h) </Text>
            <Text>AAAAAAAAA</Text>
        </Box>
    );

//   const options = ['Option 1', 'Option 2', 'Option 3'];
//   const [selectedOption, setSelectedOption] = useState(0);
//   const [search, setSearch] = useState('');

//   // Handle user input
//   useInput((input, key) => {
//     if (key.return) {
//       // Enter key pressed, handle the selected option here
//       console.log('Selected:', options[selectedOption]);
//     } else if (key.downArrow) {
//       // Down arrow key pressed, move selection down
//       setSelectedOption((prev) => (prev + 1) % options.length);
//     } else if (key.upArrow) {
//       // Up arrow key pressed, move selection up
//       setSelectedOption((prev) => (prev - 1 + options.length) % options.length);
//     } else if (input) {
//         setSearch((prev) => prev + input);
//     }
//   });

//   return (
//     <Box flexDirection="column">
//       <Box borderStyle="round" borderColor="blue" padding={1}>
//         <Text bold color="blue">
//         K00S TUI Diagnostic Terminal
//         </Text>
//       </Box>

//       <Box marginTop={1}>
//         <Text>Search: </Text>
//         <Text color="cyan">{search}</Text>
//       </Box>

//       <Box marginTop={1}>
//         <Text>Select an option:</Text>
//         {options.map((option, index) => (
//           <Text key={index} color={selectedOption === index ? 'green' : undefined}>
//             {index + 1}. {option}
//           </Text>
//         ))}
//       </Box>

//       <Box flexGrow={1} marginTop={1} borderStyle="round" borderColor="blue" padding={1}>
//         {/* Add the dynamic content or components here */}
//       </Box>
//     </Box>
//   );
};

const handleInput = (input: string, navigateTo: (screen: string) => void) => {
    if (input === 'key.escape') {
        navigateTo('home');
    }

    if (input === 's') {
        navigateTo('s3');
    }

    if (input === 'h') {
        console.log("Help pressed")
        navigateTo('help');
    }
};

registerScreen({ name: 'home', shortcut: 'esc', Component: HomeScreen, handleInput });

export default HomeScreen;

// export default withScreenRegistration({ 
//     name: 'home', 
//     shortcut: 'esc',
//     handleInput: handleInput
// })(HomeScreen);
