import React, { useContext } from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Card, Icon, Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemeContext } from '../Theme/Theme'
import useStore from '../Store/useStore'
import RoleIcon from '../Components/RoleIcon'
import UserIcon from '../Components/UserIcon'
import { resetDistribution } from '../Actions/actions'

const DistributionPage = (): React.JSX.Element => {
  const { theme } = useContext(ThemeContext)
  const assignedRole = useStore((state) =>
    state.team?.roles.find(
      (role) =>
        role.id ===
        state.team?.distribution?.find(({ userId }) => userId === state.me?.id)
          ?.roleId
    )
  )
  const teamAsignment = useStore((state) =>
    state.team?.users.map((user) => ({
      user,
      role: state.team?.roles.find(
        (role) =>
          role.id ===
          state.team?.distribution?.find(
            (distribution) => distribution.userId === user.id
          )?.roleId
      )
    }))
  )
  const unassignedRoles = useStore((state) =>
    state.team?.roles.filter(
      (role) =>
        state.team?.distribution?.find(({ roleId }) => roleId === role.id) ==
        null
    )
  )
  const isLeader = useStore((state) => state.me?.isLeader)
  return (
    <SafeAreaView style={{ width: '100%', alignItems: 'center' }}>
      <ScrollView
        contentContainerStyle={{
          width: '100%',
          alignItems: 'center'
        }}
        style={{ width: '100%' }}
      >
        <Card
          style={{
            width: '85%',
            minHeight: 200,
            justifyContent: 'center',
            marginTop: 20,
            marginBottom: 20
          }}
          mode={'outlined'}
        >
          <Card.Content style={{ width: '100%', alignItems: 'center' }}>
            {assignedRole != null
              ? (
              <>
                <Text variant={'titleMedium'}>You&#39;ve been assigned to</Text>
                <Text
                  variant={'headlineMedium'}
                  style={{ textAlign: 'center' }}
                >
                  {assignedRole.title}
                </Text>
              </>
                )
              : (
              <>
                <Text variant={'titleMedium'} style={{ marginBottom: 20 }}>
                  Sorry, You haven&#39;t been assigned any role
                </Text>
                <Icon
                  source={'emoticon-cry'}
                  size={40}
                  color={theme.colors.primary}
                />
              </>
                )}
          </Card.Content>
        </Card>
        {isLeader === true && (
          <Button
            style={{ marginVertical: 15, width: '85%' }}
            mode={'contained'}
            onPress={resetDistribution}
          >
            Go back to roles editing
          </Button>
        )}
        {teamAsignment?.map(({ user, role }) => (
          <Card
            key={user.id}
            style={{
              height: 150,
              marginTop: 10,
              width: '85%',
              alignSelf: 'center'
            }}
            contentStyle={{ width: '100%' }}
          >
            <Card.Content style={{ width: '100%', alignItems: 'center' }}>
              <View
                style={{
                  flexDirection: 'row',
                  height: '50%',
                  alignItems: 'center'
                }}
              >
                <UserIcon color={user.color} size={30} />
                <Text
                  variant={'titleMedium'}
                  style={{ marginLeft: 10 }}
                  ellipsizeMode={'tail'}
                  numberOfLines={1}
                >
                  {user.username}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  height: '50%',
                  alignItems: 'center'
                }}
              >
                {role != null
                  ? (
                  <>
                    <RoleIcon size={30} icon={role?.icon ?? 'tea'} />
                    <Text
                      variant={'titleMedium'}
                      style={{ marginLeft: 10 }}
                      ellipsizeMode={'tail'}
                      numberOfLines={1}
                    >
                      {role?.title}
                    </Text>
                  </>
                    )
                  : (
                  <Text>No role assigned</Text>
                    )}
              </View>
            </Card.Content>
          </Card>
        ))}
        {unassignedRoles != null && unassignedRoles.length > 0 && (
          <>
            <Text variant={'titleLarge'} style={{ marginTop: 20 }}>
              Unassigned Roles
            </Text>
            {unassignedRoles?.map((role) => (
              <Card
                key={role.id}
                style={{
                  height: 100,
                  marginTop: 10,
                  width: '85%',
                  alignSelf: 'center',
                  justifyContent: 'center'
                }}
              >
                <Card.Content
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}
                  >
                    <RoleIcon size={30} icon={role?.icon ?? 'tea'} />
                    <Text
                      variant={'titleMedium'}
                      style={{ marginLeft: 10 }}
                      ellipsizeMode={'tail'}
                      numberOfLines={1}
                    >
                      {role?.title}
                    </Text>
                  </View>
                </Card.Content>
              </Card>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default DistributionPage
