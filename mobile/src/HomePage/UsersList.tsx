import { FlatList, Pressable, View } from 'react-native'
import { Card, Icon, Text } from 'react-native-paper'
import React, { useContext } from 'react'
import { ThemeContext } from '../Theme/Theme'
import useStore from '../Store/useStore'
import UserIcon from '../Components/UserIcon'
import { type NavigationProp, useNavigation } from '@react-navigation/native'
import { type NavigationParamList } from '../Navigation/Navigator'

const UsersList = (): React.JSX.Element => {
  const { theme } = useContext(ThemeContext)
  const users = useStore((state) => state.team?.users)
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
          paddingHorizontal: 10
        }}
      >
        <Icon
          size={25}
          source={'account-group'}
          color={theme.colors.onPrimary}
        />
        <Text style={{ color: theme.colors.onPrimary, marginLeft: 5 }} variant={'titleLarge'}>
          Teammates ({users?.length})
        </Text>
      </View>
      <FlatList
        style={{ marginTop: 10 }}
        horizontal={true}
        data={users}
        renderItem={(item) => (
          <Pressable
            onPress={() => {
              navigation.navigate('user', { id: item.item.id })
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
                  <UserIcon color={item.item.color} size={30} />
                  <Text
                    variant={'titleMedium'}
                    style={{ marginLeft: 10 }}
                    ellipsizeMode={'tail'}
                    numberOfLines={1}
                  >
                    {item.item.username}
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
    </View>
  )
}

export default UsersList
