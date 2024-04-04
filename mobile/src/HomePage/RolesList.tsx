import { FlatList, View } from 'react-native'
import { Avatar, Card, Text } from 'react-native-paper'
import React, { useContext } from 'react'
import { ThemeContext } from '../Theme/Theme'
import useStore from '../Store/useStore'

const RolesList = (): React.JSX.Element => {
  const { theme } = useContext(ThemeContext)
  const roles = useStore((state) => state.team?.roles)
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
          paddingHorizontal: 10
        }}
      >
        <Text style={{ color: theme.colors.onPrimary }} variant={'titleLarge'}>
          Roles ({roles?.length})
        </Text>
      </View>
      <FlatList
        style={{ marginTop: 10 }}
        horizontal={true}
        data={roles}
        renderItem={(item) => (
          <Card style={{ height: 150, marginRight: 10, width: 310 }}>
            <Card.Content style={{ width: '90%' }}>
              <View
                style={{
                  flexDirection: 'row',
                  height: '50%',
                  alignItems: 'center'
                }}
              >
                <Avatar.Icon size={30} icon={'book'}/>
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
        )}
      />
    </View>
  )
}

export default RolesList
