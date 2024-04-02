import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from "react-native-paper";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import { createContext, useEffect, useState } from "react";
import { setItemAsync, getItemAsync } from "expo-secure-store";
import { IS_DARK_KEY } from "./config/secureStore";
import React from "react";

const { LightTheme: AdaptedLightTheme, DarkTheme: AdaptedDarkTheme } =
  adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });

const LightTheme = {
  ...MD3LightTheme,
  ...AdaptedLightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...AdaptedLightTheme.colors,
    primary: "#F67357"
  },
};
const DarkTheme = {
  ...MD3DarkTheme,
  ...AdaptedDarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...AdaptedDarkTheme.colors,
    primary: "#F67357"
  },
};

export const ThemeContext = createContext({
  theme: DarkTheme,
  toggleTheme: () => {},
  isDark: true,
});

export const ThemeProvider = ({ children }:{children: React.JSX.Element}) => {
  const [isDark, setIsDark] = useState(true);

  const setDefaultState = async () => {
    const cachedValue = await getItemAsync(IS_DARK_KEY);
    if(!cachedValue) {
      setIsDark(true);
      await setItemAsync(IS_DARK_KEY, 'true')
    }
    else setIsDark(cachedValue === "true");
  };

  useEffect(() => {
    setDefaultState();
  }, []);

  const toggleTheme = async () => {
    await setItemAsync(IS_DARK_KEY, String(!isDark));
    setIsDark((val) => !val);
  };

  return (
    <ThemeContext.Provider
      value={{
        isDark: isDark,
        theme: isDark ? DarkTheme : LightTheme,
        toggleTheme,
      }}
    >
      <PaperProvider theme={isDark ? DarkTheme : LightTheme}>
        {children}
      </PaperProvider>
    </ThemeContext.Provider>
  );
};
