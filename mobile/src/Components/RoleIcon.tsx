import React from 'react'
import { Avatar } from 'react-native-paper'
import type { StyleProp, ViewStyle } from 'react-native'
import { type RoleIcon as RoleIconType } from '../types'

const RoleIcon = ({ icon, size, style }: propsType): React.JSX.Element => {
  return <Avatar.Icon icon={icon} size={size} style={style} />
}

interface propsType {
  icon: RoleIconType
  size?: number
  style?: StyleProp<ViewStyle>
}

export default RoleIcon
