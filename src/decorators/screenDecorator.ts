import React from 'react';
import { ScreenName, ScreenShortcut } from './screenTypes';
import { registerScreen } from '../router/ScreenRegistry';

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
