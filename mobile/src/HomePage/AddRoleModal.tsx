import useStore from '../Store/useStore'
import React, { useContext, useState } from 'react'
import {
  Button,
  HelperText,
  Modal,
  Portal,
  Text,
  TextInput
} from 'react-native-paper'
import { View } from 'react-native'
import { ThemeContext } from '../Theme/Theme'
import { addRole } from '../Actions/actions'

const AddRoleModal = ({ visible, hide }: propsType): React.JSX.Element => {
  const roles = useStore((state) => state.team?.roles)
  const [title, setTitle] = useState('')
  const [titleError, setTitleError] = useState('')
  const [description, setDescription] = useState('')
  const [descriptionError] = useState('')

  const handleTitleChange = (newTitle: string): void => {
    setTitle(newTitle)
    setTitleError('')
    if (newTitle === '') setTitleError("Title can't be empty.")
    if (roles?.some((role) => role.title === newTitle) ?? false) {
      setTitleError('Title already taken.')
    }
  }

  const handleDescriptionChange = (newDescription: string): void => {
    setDescription(newDescription)
  }

  const { theme } = useContext(ThemeContext)
  return (
    <Portal>
      <Modal visible={visible} onDismiss={hide}>
        <View
          style={{
            width: '85%',
            backgroundColor: theme.colors.background,
            alignSelf: 'center',
            borderRadius: 30,
            alignItems: 'center'
          }}
        >
          <Text variant={'titleLarge'} style={{ marginTop: 20 }}>
            New Role
          </Text>
          <View style={{ marginTop: 20, width: '90%' }}>
            <TextInput
              label={'Title'}
              mode={'outlined'}
              value={title}
              onChangeText={handleTitleChange}
              error={Boolean(titleError)}
            />
            <HelperText type={'error'} visible={Boolean(titleError)}>
              {titleError}
            </HelperText>
            <TextInput
              label={'Description'}
              mode={'outlined'}
              defaultValue={description}
              onChangeText={handleDescriptionChange}
              multiline={true}
              style={{ marginTop: 10 }}
              error={Boolean(descriptionError)}
            />
            <HelperText type={'error'} visible={Boolean(descriptionError)}>
              {descriptionError}
            </HelperText>
          </View>
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
            <Button style={{ marginLeft: 35 }} onPress={hide}>
              Cancel
            </Button>
            <Button
              mode={'contained'}
              style={{ marginRight: 10 }}
              disabled={Boolean(titleError) || Boolean(descriptionError)}
              onPress={() => {
                addRole({ title, description })
                setTitle('')
                setDescription('')
                hide()
              }}
            >
              Save Changes
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  )
}

interface propsType {
  visible: boolean
  hide: () => void
}

export default AddRoleModal
