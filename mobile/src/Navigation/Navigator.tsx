import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { ThemeContext } from '../Theme/Theme'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import JoinTeam from '../JoinPage/JoinTeam'
import useStore from '../Store/useStore'
import Home from '../HomePage/Home'

const Stack = createNativeStackNavigator()

const Navigator = (): React.JSX.Element => {
  const { theme } = useContext(ThemeContext)
  const team = useStore((state) => state.team)
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {(team != null)
          ? (
          <>
            <Stack.Screen name="home" component={Home} />
          </>
            )
          : (
          <>
            <Stack.Screen name="join" component={JoinTeam} />
          </>
            )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator
