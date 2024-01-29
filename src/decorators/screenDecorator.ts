import React from 'react';
import { ScreenName, ScreenShortcut } from './screenTypes.js';
import { registerScreen } from '../router/ScreenRegistry.js';

interface ScreenOptions {
    name: ScreenName;
    shortcut: ScreenShortcut;
}

export function Screen(options: ScreenOptions) {
    return function <T extends React.ComponentType<any>>(Component: T) {
        registerScreen({
            name: options.name,
            Component: Component,
            shortcut: options.shortcut
        });
        return Component;
    };
}
