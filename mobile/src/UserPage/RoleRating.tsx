import React, { useContext, useEffect, useState } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import useStore from '../Store/useStore'
import { ThemeContext } from '../Theme/Theme'
import { rate } from '../Actions/actions'
import StarRating from 'react-native-star-rating-widget'

const RoleRating = ({ roleId, userId }: PropsType): React.JSX.Element => {
  const { theme } = useContext(ThemeContext)
  const role = useStore((state) =>
    state.team?.roles.find((role) => role.id === roleId)
  )
  const rating = useStore((state) =>
    state.team?.ratings.find(
      (rating) =>
        rating.from === state.me?.id &&
        rating.to === userId &&
        rating.roleId === roleId
    )
  )
  const [ratingValue, setRatingValue] = useState(3)
  useEffect(() => {
    if (rating == null) return
    setRatingValue(rating.value)
  }, [rating])
  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: theme.colors.elevation.level1,
        borderRadius: 20,
        marginTop: 15
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
        {role?.title}
      </Text>
      <StarRating
        rating={ratingValue}
        onChange={(value) => {
          setRatingValue(value)
          rate({ userId, roleId, value })
        }}
        enableHalfStar={false}
        style={{ marginBottom: 15 }}
        enableSwiping={false}
        color={theme.colors.primary}
      />
    </View>
  )
}

interface PropsType {
  roleId: string
  userId: string
}

export default RoleRating
