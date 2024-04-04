import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme
} from 'react-native-paper'
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme
} from '@react-navigation/native'
import React, { createContext, useEffect, useState } from 'react'
import { setItemAsync, getItemAsync } from 'expo-secure-store'
import { IS_DARK_KEY } from '../config/secureStore'
import useStore from '../Store/useStore'
import themeColorsMap from './themeColorsMap'

const { LightTheme: AdaptedLightTheme, DarkTheme: AdaptedDarkTheme } =
  adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme
  })

const baseLightTheme = {
  ...MD3LightTheme,
  ...AdaptedLightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...AdaptedLightTheme.colors
  }
}
const baseDarkTheme = {
  ...MD3DarkTheme,
  ...AdaptedDarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...AdaptedDarkTheme.colors
  }
}

export const ThemeContext = createContext({
  theme: baseDarkTheme,
  toggleTheme: async () => {},
  isDark: true
})

export const ThemeProvider = ({
  children
}: {
  children: React.JSX.Element
}): React.JSX.Element => {
  const [isDark, setIsDark] = useState(true)
  const myColor = useStore((state) => state.me?.color) ?? 'blue'

  const LightTheme = {
    ...baseLightTheme,
    colors: { ...baseLightTheme.colors, ...themeColorsMap.light[myColor] }
  }
  const DarkTheme = {
    ...baseLightTheme,
    colors: { ...baseLightTheme.colors, ...themeColorsMap.dark[myColor] }
  }

  const setDefaultState = async (): Promise<void> => {
    const cachedValue = await getItemAsync(IS_DARK_KEY)
    if (cachedValue == null) {
      setIsDark(true)
      await setItemAsync(IS_DARK_KEY, 'true')
    } else {
      setIsDark(cachedValue === 'true')
    }
  }

  useEffect(() => {
    setDefaultState().catch(() => {})
  }, [])

  const toggleTheme = async (): Promise<void> => {
    await setItemAsync(IS_DARK_KEY, String(!isDark))
    setIsDark((val) => !val)
  }

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        theme: isDark ? DarkTheme : LightTheme,
        toggleTheme
      }}
    >
      <PaperProvider theme={isDark ? DarkTheme : LightTheme}>
        {children}
      </PaperProvider>
    </ThemeContext.Provider>
  )
}
