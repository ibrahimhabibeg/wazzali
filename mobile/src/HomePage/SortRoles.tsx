import React, { useContext, useEffect, useState } from 'react'
import { View } from 'react-native'
import { Icon, List, Text } from 'react-native-paper'
import { ThemeContext } from '../Theme/Theme'
import DraggableFlatList, {
  type RenderItemParams,
  ScaleDecorator
} from 'react-native-draggable-flatlist'
import useStore from '../Store/useStore'
import { type Role } from '../types'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { updateRolesPreference } from '../Actions/actions'

const SortRoles = (): React.JSX.Element => {
  const { theme } = useContext(ThemeContext)
  const [data, setData] = useState<Array<Role | undefined>>([])
  const rolesPreference = useStore((state) => state.me?.rolesPreference)
  const roles = useStore((state) => state.team?.roles)

  useEffect(() => {
    if (rolesPreference != null && roles != null) {
      setData(
        rolesPreference.map((id) => roles.find((role) => role.id === id))
      )
    }
  }, [rolesPreference, roles])

  const renderItem = ({
    item,
    drag
  }: RenderItemParams<Role | undefined>): React.JSX.Element => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          style={{ width: '90%', alignSelf: 'center' }}
        >
          <List.Item
            title={item?.title}
            left={() => <List.Icon icon={'drag'} />}
          />
        </TouchableOpacity>
      </ScaleDecorator>
    )
  }

  return (
    <>
      <View style={{ width: '85%', marginTop: 20 }}>
        <View
          style={{
            width: '100%',
            backgroundColor: theme.colors.primary,
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 5,
            paddingHorizontal: 10
          }}
        >
          <Icon size={25} source={'heart'} color={theme.colors.onPrimary} />
          <Text
            style={{ color: theme.colors.onPrimary, marginLeft: 5 }}
            variant={'titleLarge'}
          >
            My Roles Preference
          </Text>
        </View>
      </View>
      <View style={{ width: '100%' }}>
        <DraggableFlatList
          data={data ?? []}
          onDragEnd={({ data }): void => {
            setData(data)
            updateRolesPreference(data.map((role) => role?.id ?? ''))
          }}
          keyExtractor={(item) => item?.title ?? ''}
          renderItem={renderItem}
        />
      </View>
    </>
  )
}

export default SortRoles
