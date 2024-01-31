import React from 'react';
import HomeScreen from '../components/HomeScreen';
import { getScreenConfig } from './ScreenRegistry';
import { useNavigation } from '../context/NavigationContext';
import useGlobalInput from './useGlobalInput';

const ScreenRouter = () => {
    const { currentScreen, navigateTo } = useNavigation();
    const screenConfig = getScreenConfig(currentScreen);

    if (!screenConfig) return <HomeScreen/>; // or default screen

    const { Component, handleInput } = screenConfig;

    // Centralize input handling
    useGlobalInput(navigateTo, handleInput);

    return <Component />;
};

export default ScreenRouter;