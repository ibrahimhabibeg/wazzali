import { FlatList, Pressable, View } from 'react-native'
import { Avatar, Card, Icon, Text } from 'react-native-paper'
import React, { useContext, useState } from 'react'
import { ThemeContext } from '../Theme/Theme'
import useStore from '../Store/useStore'
import AddRoleModal from './AddRoleModal'
import { type NavigationProp, useNavigation } from '@react-navigation/native'
import { type NavigationParamList } from '../Navigation/Navigator'

const RolesList = (): React.JSX.Element => {
  const { theme } = useContext(ThemeContext)
  const roles = useStore((state) => state.team?.roles)
  const me = useStore((state) => state.me)
  const [isAddingRole, setIsAddingRole] = useState(false)
  const navigation = useNavigation<NavigationProp<NavigationParamList>>()
  return (
    <View style={{ width: '85%', marginTop: 20 }}>
      <View
        style={{
          width: '100%',
          backgroundColor: theme.colors.primary,
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 5,
          paddingHorizontal: 10,
          justifyContent: 'space-between'
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <Icon size={25} source={'hard-hat'} color={theme.colors.onPrimary} />
          <Text
            style={{ color: theme.colors.onPrimary, marginLeft: 5 }}
            variant={'titleLarge'}
          >
            Roles ({roles?.length})
          </Text>
        </View>

        {(me?.isLeader ?? false) && (
          <Pressable
            onPress={() => {
              setIsAddingRole(true)
            }}
          >
            <Icon
              source={'plus-thick'}
              size={26}
              color={theme.colors.onPrimary}
            />
          </Pressable>
        )}
      </View>
      <FlatList
        style={{ marginTop: 10 }}
        horizontal={true}
        data={roles}
        renderItem={(item) => (
          <Pressable
            onPress={() => {
              navigation.navigate('role', { id: item.item.id })
            }}
          >
            <Card style={{ height: 150, marginRight: 10, width: 310 }}>
              <Card.Content style={{ width: '90%' }}>
                <View
                  style={{
                    flexDirection: 'row',
                    height: '50%',
                    alignItems: 'center'
                  }}
                >
                  <Avatar.Icon size={30} icon={'book'} />
                  <Text
                    variant={'titleMedium'}
                    style={{ marginLeft: 10 }}
                    ellipsizeMode={'tail'}
                    numberOfLines={1}
                  >
                    {item.item.title}
                  </Text>
                </View>
                <View style={{ height: '50%', justifyContent: 'center' }}>
                  <Text ellipsizeMode={'tail'} numberOfLines={1}>
                    {item.item.description}
                  </Text>
                </View>
              </Card.Content>
            </Card>
          </Pressable>
        )}
      />
      <AddRoleModal
        visible={isAddingRole}
        hide={() => {
          setIsAddingRole(false)
        }}
      />
    </View>
  )
}

export default RolesList
