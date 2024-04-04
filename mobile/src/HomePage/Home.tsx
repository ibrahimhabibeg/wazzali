import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import UsersList from './UsersList'
import Me from './Me'
import ShareTeam from './ShareTeam'

const Home = (): React.JSX.Element => {
  return (
    <SafeAreaView style={{ display: 'flex', alignItems: 'center' }}>
      <Me />
      <UsersList />
      <ShareTeam />
    </SafeAreaView>
  )
}

export default Home
