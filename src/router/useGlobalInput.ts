import { useInput } from 'ink';

// Update the type of customHandler to also accept navigateTo as a parameter
const useGlobalInput = (
    navigateTo: (screen: string) => void, 
    customHandler?: (input: string, navigateTo: (screen: string) => void) => void
) => {
    useInput((input, key) => {
        if (customHandler) {
            customHandler(input, navigateTo);
        }

        if(key.ctrl && input === 'q') {
            process.exit()
        }

        if(key.ctrl && input === 'h') {
            navigateTo('help')
        }

        if(key.escape) {
            navigateTo('home')
        }
        // Add global key handling here if needed
    });
};

export default useGlobalInput;
