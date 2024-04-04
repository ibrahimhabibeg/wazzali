import { SafeAreaView } from 'react-native-safe-area-context'
import useStore from '../Store/useStore'
import { Avatar, Icon, Text } from 'react-native-paper'
import React, { useState } from 'react'
import { type NativeStackScreenProps } from '@react-navigation/native-stack'
import { type NavigationParamList } from '../Navigation/Navigator'
import { Pressable } from 'react-native'
import EditRoleModal from './EditRoleModal'

const Role = ({
  route: {
    params: { title }
  }
}: PropsType): React.JSX.Element => {
  const role = useStore((state) =>
    state.team?.roles.find((val) => val.title === title)
  )
  const isLeader = useStore((state) => state.me?.isLeader)
  const [isEditingData, setIsEditingData] = useState(false)

  return (
    <SafeAreaView
      style={{ alignItems: 'center', width: '85%', alignSelf: 'center' }}
    >
      {isLeader === true && (
        <Pressable
          style={{ alignSelf: 'flex-end', marginTop: 20 }}
          onPress={() => {
            setIsEditingData((val) => !val)
          }}
        >
          <Icon size={22} source={'square-edit-outline'} />
        </Pressable>
      )}

      <Avatar.Icon icon={'book'} size={80} style={{ marginTop: 10 }} />
      <Text
        variant="headlineMedium"
        style={{ marginTop: 20, textAlign: 'center' }}
      >
        {role?.title}
      </Text>
      <Text variant="bodyLarge" style={{ marginTop: 15, textAlign: 'center' }}>
        {role?.description}
      </Text>
      <EditRoleModal
        visible={isEditingData}
        hide={() => {
          setIsEditingData(false)
        }}
        title={title}
      />
    </SafeAreaView>
  )
}

type PropsType = NativeStackScreenProps<NavigationParamList, 'role'>

export default Role
