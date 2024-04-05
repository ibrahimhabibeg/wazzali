import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import UsersList from './UsersList'
import Me from './Me'
import ShareTeam from './ShareTeam'
import RolesList from './RolesList'
import { ScrollView } from 'react-native'
import SortRoles from './SortRoles'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const Home = (): React.JSX.Element => {
  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <ScrollView
          contentContainerStyle={{ display: 'flex', alignItems: 'center' }}
        >
          <Me />
          <UsersList />
          <RolesList />
          <SortRoles />
          <ShareTeam />
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default Home
