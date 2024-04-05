import React, { useContext, useState } from 'react'
import { Button, Modal, Portal, Text } from 'react-native-paper'
import { deleteRole } from '../Actions/actions'
import { type NavigationProp, useNavigation } from '@react-navigation/native'
import { type NavigationParamList } from '../Navigation/Navigator'
import { ThemeContext } from '../Theme/Theme'
import { View } from 'react-native'
import useStore from '../Store/useStore'

const DeleteRoleButton = ({ id }: PropsType): React.JSX.Element => {
  const role = useStore((state) =>
    state.team?.roles.find((val) => val.id === id)
  )
  const navigation = useNavigation<NavigationProp<NavigationParamList>>()
  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const { theme } = useContext(ThemeContext)
  const hideModal = (): void => {
    setIsVisibleModal(false)
  }
  const showModal = (): void => {
    setIsVisibleModal(true)
  }
  return (
    <>
      <Button
        onPress={showModal}
        textColor={theme.colors.error}
        style={{
          marginTop: 30
        }}
        icon={'delete'}
        mode={'outlined'}
      >
        Delete Role
      </Button>
      <Portal>
        <Modal visible={isVisibleModal} onDismiss={hideModal}>
          <View
            style={{
              width: '85%',
              backgroundColor: theme.colors.background,
              alignSelf: 'center',
              borderRadius: 30,
              alignItems: 'center'
            }}
          >
            <Text
              variant={'titleLarge'}
              style={{
                marginTop: 20,
                width: '90%',
                alignSelf: 'center',
                textAlign: 'center'
              }}
            >
              Are you sure you want to delete the role {role?.title}?
            </Text>
            <Text
              variant={'bodyMedium'}
              style={{
                marginTop: 30,
                marginBottom: 30,
                width: '90%',
                alignSelf: 'center',
                textAlign: 'center'
              }}
            >
              This action can&#39;t be reversed
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: 30,
                marginBottom: 20,
                marginRight: 10
              }}
            >
              <Button
                style={{ marginLeft: 35 }}
                onPress={hideModal}
                textColor={theme.colors.onSurface}
              >
                Cancel
              </Button>
              <Button
                mode={'contained'}
                style={{ marginRight: 10 }}
                onPress={() => {
                  deleteRole(id)
                  navigation.navigate('home')
                  hideModal()
                }}
                textColor={theme.colors.error}
                buttonColor={theme.colors.errorContainer}
              >
                Yes, Delete
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
    </>
  )
}

interface PropsType {
  id: string
}

export default DeleteRoleButton
