import React from 'react';
import HomeScreen from '../components/HomeScreen.js';
import { getScreenConfig } from './ScreenRegistry.js';
import { useNavigation } from '../context/NavigationContext.js';
import useGlobalInput from './useGlobalInput.js';

const ScreenRouter = () => {
    const { currentScreen, navigateTo, goBack } = useNavigation();
    const screenConfig = getScreenConfig(currentScreen);

    if (!screenConfig) return <HomeScreen/>; // or default screen

    const { Component, handleInput } = screenConfig;

    // Centralize input handling
    useGlobalInput(navigateTo, handleInput);

    return <Component />;
};

export default ScreenRouter;