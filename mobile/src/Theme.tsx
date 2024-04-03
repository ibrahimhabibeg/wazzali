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
    "primary": "rgb(135, 82, 0)",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "rgb(255, 221, 186)",
    "onPrimaryContainer": "rgb(43, 23, 0)",
    "secondary": "rgb(0, 95, 175)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(212, 227, 255)",
    "onSecondaryContainer": "rgb(0, 28, 58)",
    "tertiary": "rgb(56, 107, 1)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(183, 244, 129)",
    "onTertiaryContainer": "rgb(13, 32, 0)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "rgb(255, 251, 255)",
    "onBackground": "rgb(31, 27, 22)",
    "surface": "rgb(255, 251, 255)",
    "onSurface": "rgb(31, 27, 22)",
    "surfaceVariant": "rgb(241, 224, 208)",
    "onSurfaceVariant": "rgb(80, 69, 58)",
    "outline": "rgb(130, 117, 104)",
    "outlineVariant": "rgb(212, 196, 181)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(53, 47, 42)",
    "inverseOnSurface": "rgb(249, 239, 231)",
    "inversePrimary": "rgb(255, 184, 101)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(249, 243, 242)",
      "level2": "rgb(245, 238, 235)",
      "level3": "rgb(242, 232, 227)",
      "level4": "rgb(241, 231, 224)",
      "level5": "rgb(238, 227, 219)"
    },
    "surfaceDisabled": "rgba(31, 27, 22, 0.12)",
    "onSurfaceDisabled": "rgba(31, 27, 22, 0.38)",
    "backdrop": "rgba(57, 47, 36, 0.4)"
  },
};
const DarkTheme = {
  ...MD3DarkTheme,
  ...AdaptedDarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...AdaptedDarkTheme.colors,
    "primary": "rgb(179, 197, 255)",
    "onPrimary": "rgb(0, 42, 118)",
    "primaryContainer": "rgb(0, 63, 165)",
    "onPrimaryContainer": "rgb(219, 225, 255)",
    "secondary": "rgb(74, 225, 131)",
    "onSecondary": "rgb(0, 57, 25)",
    "secondaryContainer": "rgb(0, 82, 40)",
    "onSecondaryContainer": "rgb(107, 254, 156)",
    "tertiary": "rgb(255, 185, 78)",
    "onTertiary": "rgb(69, 43, 0)",
    "tertiaryContainer": "rgb(98, 64, 0)",
    "onTertiaryContainer": "rgb(255, 221, 178)",
    "error": "rgb(255, 180, 171)",
    "onError": "rgb(105, 0, 5)",
    "errorContainer": "rgb(147, 0, 10)",
    "onErrorContainer": "rgb(255, 180, 171)",
    "background": "rgb(27, 27, 31)",
    "onBackground": "rgb(228, 226, 230)",
    "surface": "rgb(27, 27, 31)",
    "onSurface": "rgb(228, 226, 230)",
    "surfaceVariant": "rgb(69, 70, 79)",
    "onSurfaceVariant": "rgb(197, 198, 208)",
    "outline": "rgb(143, 144, 154)",
    "outlineVariant": "rgb(69, 70, 79)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(228, 226, 230)",
    "inverseOnSurface": "rgb(48, 48, 52)",
    "inversePrimary": "rgb(39, 87, 195)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(35, 36, 42)",
      "level2": "rgb(39, 41, 49)",
      "level3": "rgb(44, 46, 56)",
      "level4": "rgb(45, 47, 58)",
      "level5": "rgb(48, 51, 62)"
    },
    "surfaceDisabled": "rgba(228, 226, 230, 0.12)",
    "onSurfaceDisabled": "rgba(228, 226, 230, 0.38)",
    "backdrop": "rgba(46, 48, 56, 0.4)"
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
