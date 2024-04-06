import { SafeAreaView } from 'react-native-safe-area-context'
import useStore from '../Store/useStore'
import { Text } from 'react-native-paper'
import React from 'react'
import { type NativeStackScreenProps } from '@react-navigation/native-stack'
import { type NavigationParamList } from '../Navigation/Navigator'
import RolesRating from './RolesRating'
import UserIcon from '../Components/UserIcon'
import { ScrollView } from 'react-native'

const UserPage = ({
  route: {
    params: { id }
  }
}: PropsType): React.JSX.Element => {
  const user = useStore((state) =>
    state.team?.users.find((val) => val.id === id)
  )

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{ alignItems: 'center', width: '85%', alignSelf: 'center' }}
      >
        <UserIcon color={user?.color ?? 'blue'} style={{ marginTop: 20 }} />
        <Text
          variant="headlineMedium"
          style={{ marginTop: 20, textAlign: 'center' }}
        >
          {user?.username}
        </Text>
        <Text
          variant="bodyLarge"
          style={{ marginTop: 15, textAlign: 'center' }}
        >
          {user?.description}
        </Text>
        <RolesRating userId={id} />
      </ScrollView>
    </SafeAreaView>
  )
}

type PropsType = NativeStackScreenProps<NavigationParamList, 'user'>

export default UserPage
