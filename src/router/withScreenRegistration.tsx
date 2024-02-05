// withScreenRegistration.tsx
import React from 'react';
import { ScreenName, ScreenShortcut } from '../decorators/screenTypes.js';
import { registerScreen } from './ScreenRegistry.js';

interface ScreenOptions {
    name: ScreenName;
    shortcut: ScreenShortcut;
    handleInput?: (input: string, navigateTo: (screen: string) => void) => void;
}

const withScreenRegistration = (options: ScreenOptions) => (Component: React.ComponentType) => {
    console.log('withScreenRegistration', options);
    // Register the screen
    registerScreen({
        name: options.name,
        Component: Component,
        shortcut: options.shortcut,
        handleInput: options.handleInput
    });

    // Return the wrapped component
    return (props: any) => <Component {...props} />;
};

export default withScreenRegistration;
