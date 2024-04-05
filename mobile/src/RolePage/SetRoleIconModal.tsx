import React, { useContext } from 'react'
import { Pressable, View } from 'react-native'
import { Modal, Portal } from 'react-native-paper'
import { ThemeContext } from '../Theme/Theme'
import roleIcons from './roleIcons'
import RoleIcon from '../Components/RoleIcon'
import { setRoleIcon } from '../Actions/actions'

const SetRoleIconModal = ({
  id,
  hide,
  visible
}: PropsType): React.JSX.Element => {
  const { theme } = useContext(ThemeContext)
  return (
    <Portal>
      <Modal visible={visible} onDismiss={hide}>
        <View
          style={{
            width: '85%',
            alignSelf: 'center',
            borderRadius: 30,
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center',
            flexDirection: 'row',
            backgroundColor: theme.colors.backdrop
          }}
        >
          {roleIcons.map((icon) => (
            <Pressable
              key={icon}
              onPress={() => {
                setRoleIcon({ icon, roleId: id })
                hide()
              }}
            >
              <RoleIcon icon={icon} size={50} style={{ margin: 10 }} />
            </Pressable>
          ))}
        </View>
      </Modal>
    </Portal>
  )
}

interface PropsType {
  id: string
  hide: () => void
  visible: boolean
}

export default SetRoleIconModal
