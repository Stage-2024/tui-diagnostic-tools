import React from 'react';
import { ScreenName, ScreenShortcut } from '../decorators/screenTypes';

interface ScreenConfig {
    name: ScreenName;
    Component: React.ComponentType;
    handleInput?: (input: string, navigateTo: (screen: string) => void) => void;
    shortcut: ScreenShortcut;
}

export default ScreenConfig;