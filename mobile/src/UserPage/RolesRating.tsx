import React, { useContext } from 'react'
import { View } from 'react-native'
import useStore from '../Store/useStore'
import { Icon, Text } from 'react-native-paper'
import { ThemeContext } from '../Theme/Theme'
import RoleRating from './RoleRating'

const RolesRating = ({ userId }: PropsType): React.JSX.Element => {
  const roles = useStore((state) => state.team?.roles)
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
          marginTop: 15
        }}
      >
        <Icon
          size={25}
          source={'account-heart'}
          color={theme.colors.onPrimary}
        />
        <Text
          style={{ color: theme.colors.onPrimary, marginLeft: 10 }}
          variant={'titleLarge'}
        >
          Rate Friend For Roles
        </Text>
      </View>
      {roles?.map((role) => (
        <RoleRating key={role.id} roleId={role.id} userId={userId} />
      ))}
    </View>
  )
}

interface PropsType {
  userId: string
}

export default RolesRating
