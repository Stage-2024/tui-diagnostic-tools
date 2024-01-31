import ScreenConfig from './ScreenConfig';

const screenRegistry: ScreenConfig[] = [];

export const registerScreen = (config: ScreenConfig) => {
    console.log('Registering screen:', config);
    screenRegistry.push(config);
};

export const getScreenConfig = (screenName: string): ScreenConfig | undefined => {
    console.log('Getting screen config for:', screenName);
    return screenRegistry.find(config => config.name === screenName);
};