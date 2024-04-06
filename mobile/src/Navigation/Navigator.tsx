import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { ThemeContext } from '../Theme/Theme'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import JoinTeam from '../JoinPage/JoinTeam'
import useStore from '../Store/useStore'
import Home from '../HomePage/Home'
import Role from '../RolePage/Role'
import UserPage from '../UserPage/UserPage'
import DistributionPage from '../DistributionPage/DistributionPage'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type NavigationParamList = {
  home: undefined
  join: undefined
  distribution: undefined
  role: { id: string }
  user: { id: string }
}

const Stack = createNativeStackNavigator<NavigationParamList>()

const Navigator = (): React.JSX.Element => {
  const { theme } = useContext(ThemeContext)
  const team = useStore((state) => state.team)
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {team != null
          ? (
              team.distribution != null
                ? (
            <Stack.Screen name="distribution" component={DistributionPage} />
                  )
                : (
            <>
              <Stack.Screen name="home" component={Home} />
              <Stack.Screen name="role" component={Role} />
              <Stack.Screen name="user" component={UserPage} />
            </>
                  )
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
