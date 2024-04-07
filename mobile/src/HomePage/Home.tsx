import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import UsersList from './UsersList'
import Me from './Me'
import ShareTeam from './ShareTeam'
import RolesList from './RolesList'
import { ScrollView } from 'react-native'
import SortRoles from './SortRoles'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import AssignRolesButton from './AssignRolesButton'
import useStore from '../Store/useStore'

const Home = (): React.JSX.Element => {
  const rolesCount = useStore((state) => state.team?.roles.length)
  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <ScrollView
          contentContainerStyle={{ display: 'flex', alignItems: 'center' }}
        >
          <Me />
          <UsersList />
          <RolesList />
          {(rolesCount != null) && rolesCount > 0 && (
            <>
              <SortRoles />
              <AssignRolesButton />
            </>
          )}
          <ShareTeam />
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default Home
