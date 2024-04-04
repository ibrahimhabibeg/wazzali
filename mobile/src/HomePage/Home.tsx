import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import UsersList from './UsersList'
import Me from './Me'
import ShareTeam from './ShareTeam'
import RolesList from './RolesList'
import { ScrollView } from 'react-native'

const Home = (): React.JSX.Element => {
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{ display: 'flex', alignItems: 'center' }}
      >
        <Me />
        <UsersList />
        <RolesList />
        <ShareTeam />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home
