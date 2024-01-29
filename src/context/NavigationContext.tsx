import React, { createContext, useState, useContext, PropsWithChildren, FunctionComponent } from 'react';

interface NavigationContextProps {
    currentScreen: string;
    navigateTo: (screen: string) => void;
    goBack: () => void;
    navigationStack: string[];
}

const NavigationContext = createContext<NavigationContextProps>({
    currentScreen: 'home',
    navigateTo: () => {},
    goBack: () => {},
    navigationStack: []
});

export const useNavigation = () => useContext(NavigationContext);

export const NavigationProvider: FunctionComponent<PropsWithChildren<{}>> = ({ children }) => {
    const [navigationStack, setNavigationStack] = useState<string[]>(['home']);
    
    const navigateTo = (screen: string) => {
        setNavigationStack(stack => [...stack, screen]);
    };

    const goBack = () => {
        setNavigationStack(stack => {
            if (stack.length > 1) {
                return stack.slice(0, stack.length - 1);
            }
            return stack;
        });
    };

    const currentScreen = navigationStack[navigationStack.length - 1];

    if(currentScreen === undefined) {
        throw new Error('currentScreen is undefined');
    }
    

    return (
        <NavigationContext.Provider value={{ currentScreen, navigateTo, goBack, navigationStack }}>
            {children}
        </NavigationContext.Provider>
    );
};
