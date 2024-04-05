import React, { useContext } from 'react'
import { View } from 'react-native'
import useStore from '../Store/useStore'
import UserRating from '../Components/UserRating'
import { Icon, Text } from 'react-native-paper'
import { ThemeContext } from '../Theme/Theme'

const UsersRating = ({ roleId }: PropsType): React.JSX.Element => {
  const users = useStore((state) => state.team?.users)
  const { theme } = useContext(ThemeContext)
  return (
    <View style={{ width: '100%', marginTop: 20 }}>
      <View
        style={{
          width: '100%',
          backgroundColor: theme.colors.primary,
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 5,
          paddingHorizontal: 10,
          marginBottom: 15,
          marginTop: 15
        }}
      >
        <Icon size={25} source={'account-heart'} color={theme.colors.onPrimary} />
        <Text style={{ color: theme.colors.onPrimary, marginLeft: 10 }} variant={'titleLarge'} >
          Rate Friends For Role
        </Text>
      </View>
      {users?.map((user) => (
        <UserRating key={user.id} roleId={roleId} userId={user.id} />
      ))}
    </View>
  )
}

interface PropsType {
  roleId: string
}

export default UsersRating
