import { SafeAreaView } from 'react-native-safe-area-context'
import useStore from '../Store/useStore'
import { Icon, Text } from 'react-native-paper'
import React, { useState } from 'react'
import { type NativeStackScreenProps } from '@react-navigation/native-stack'
import { type NavigationParamList } from '../Navigation/Navigator'
import { Pressable, ScrollView } from 'react-native'
import EditRoleModal from './EditRoleModal'
import DeleteRoleButton from './DeleteRoleButton'
import UsersRating from './UsersRating'
import RoleIcon from '../Components/RoleIcon'
import SetRoleIconModal from './SetRoleIconModal'

const Role = ({
  route: {
    params: { id }
  }
}: PropsType): React.JSX.Element => {
  const role = useStore((state) =>
    state.team?.roles.find((val) => val.id === id)
  )
  const isLeader = useStore((state) => state.me?.isLeader)
  const [isEditingData, setIsEditingData] = useState(false)
  const [isEditingIcon, setIsEditingIcon] = useState(false)

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          width: '85%',
          alignSelf: 'center'
        }}
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
        <Pressable
          onPress={() => {
            setIsEditingIcon(true)
          }}
        >
          <RoleIcon
            icon={role?.icon ?? 'tea'}
            size={80}
            style={{ marginTop: 10 }}
          />
        </Pressable>
        <Text
          variant="headlineMedium"
          style={{ marginTop: 20, textAlign: 'center' }}
        >
          {role?.title}
        </Text>
        <Text
          variant="bodyLarge"
          style={{ marginTop: 15, textAlign: 'center' }}
        >
          {role?.description}
        </Text>
        <EditRoleModal
          visible={isEditingData}
          hide={() => {
            setIsEditingData(false)
          }}
          id={id}
        />
        <UsersRating roleId={id} />
        {isLeader === true && <DeleteRoleButton id={id} />}
        <SetRoleIconModal
          visible={isEditingIcon}
          hide={() => {
            setIsEditingIcon(false)
          }}
          id={id}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

type PropsType = NativeStackScreenProps<NavigationParamList, 'role'>

export default Role
