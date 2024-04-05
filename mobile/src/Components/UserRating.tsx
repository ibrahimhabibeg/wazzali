import React, { useContext } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import useStore from '../Store/useStore'
import { AirbnbRating } from 'react-native-ratings'
import { ThemeContext } from '../Theme/Theme'
import { rate } from '../Actions/actions'

const UserRating = ({ roleId, userId }: PropsType): React.JSX.Element => {
  const { theme } = useContext(ThemeContext)
  const user = useStore((state) =>
    state.team?.users.find((user) => user.id === userId)
  )
  const rating = useStore((state) =>
    state.team?.ratings.find(
      (rating) =>
        rating.from === state.me?.id &&
        rating.to === userId &&
        rating.roleId === roleId
    )
  )
  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: theme.colors.elevation.level1,
        borderRadius: 20
      }}
    >
      <Text
        style={{
          marginTop: 15,
          marginBottom: 5,
          textAlign: 'center',
          width: '90%'
        }}
        variant={'bodyLarge'}
        numberOfLines={2}
      >
        {user?.username}
      </Text>
      <AirbnbRating
        starContainerStyle={{ marginBottom: 15 }}
        count={5}
        onFinishRating={(value) => {
          rate({ userId, roleId, value })
        }}
        size={20}
        showRating={false}
        defaultRating={rating?.value}
      />
    </View>
  )
}

interface PropsType {
  roleId: string
  userId: string
}

export default UserRating
