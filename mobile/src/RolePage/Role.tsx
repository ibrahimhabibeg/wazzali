import { SafeAreaView } from 'react-native-safe-area-context'
import useStore from '../Store/useStore'
import { Avatar, Text } from 'react-native-paper'
import React from 'react'
import { type NativeStackScreenProps } from '@react-navigation/native-stack'
import { type NavigationParamList } from '../Navigation/Navigator'

const Role = ({ route: { params: { title } } }: PropsType): React.JSX.Element => {
  const role = useStore((state) =>
    state.team?.roles.find((val) => val.title === title)
  )

  return (
    <SafeAreaView style={{ alignItems: 'center', width: '85%', alignSelf: 'center' }}>
      <Avatar.Icon icon={'book'} size={80} style={{ marginTop: 30 }}/>
      <Text variant="headlineMedium" style={{ marginTop: 20, textAlign: 'center' }}>{role?.title}</Text>
      <Text variant="bodyLarge" style={{ marginTop: 15, textAlign: 'center' }}>{role?.description}</Text>
    </SafeAreaView>
  )
}

type PropsType = NativeStackScreenProps<NavigationParamList, 'role'>

export default Role
