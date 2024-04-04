import React from 'react'
import { Avatar } from 'react-native-paper'
import colorIconMap from './colorIconMap'
import type { StyleProp, ViewStyle } from 'react-native'
import { type Color } from '../types'

const UserIcon = ({ color, size, style }: propsType): React.JSX.Element => {
  return (
    <Avatar.Image source={colorIconMap[color]} size={size} style={style} />
  )
}

interface propsType {
  color: Color
  size?: number
  style?: StyleProp<ViewStyle>
}

export default UserIcon
