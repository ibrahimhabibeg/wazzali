import useStore from "../Store/useStore";
import { useContext, useEffect, useState } from "react";
import { Button, HelperText, Modal, Portal, Text, TextInput } from "react-native-paper";
import { View } from "react-native";
import { ThemeContext } from "../Theme/Theme";
import { editMyData } from "../Actions/actions";

const EditMyDataModal = ({ visible, hide }: propsType) => {
  const me = useStore(state => state.me);
  const users = useStore(state => state.team?.users);
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState("");
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState("");

  useEffect(() => {
    if(!me) return;
    setUsername(me.username);
    setDescription(me.description);
  }, [me]);

  const handleUsernameChange = (newUsername: string) => {
    setUsername(newUsername);
    setUsernameError('');
    if (newUsername === "") setUsernameError("Username can't be empty.");
    if (newUsername !== me?.username && users?.some((user) => user.username === newUsername))
      setUsernameError("Username already taken.");
  };

  const handleDescriptionChange = (newDescription: string) => setDescription(newDescription);

  const { theme } = useContext(ThemeContext);
  return (
    <Portal>
      <Modal visible={visible} onDismiss={hide}>
        <View style={{
          width: "85%",
          backgroundColor: theme.colors.background,
          alignSelf: "center",
          borderRadius: 30,
          alignItems: "center"
        }}>
          <Text variant={"titleLarge"} style={{ marginTop: 20 }}>My Data</Text>
          <View style={{ marginTop: 20, width: "90%" }}>
            <TextInput
              label={"Username"}
              mode={"outlined"}
              value={username}
              onChangeText={handleUsernameChange}
              error={Boolean(usernameError)}
            />
            <HelperText type={"error"} visible={Boolean(usernameError)}>{usernameError}</HelperText>
            <TextInput
              label={"Description"}
              mode={"outlined"}
              defaultValue={description}
              onChangeText={handleDescriptionChange}
              multiline={true}
              style={{ marginTop: 10 }}
              error={Boolean(descriptionError)}
            />
            <HelperText type={"error"} visible={Boolean(descriptionError)}>{descriptionError}</HelperText>
          </View>
          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            marginTop: 30,
            marginBottom: 20,
            marginRight: 10
          }}>
            <Button style={{ marginLeft: 35 }} onPress={hide}>Cancel</Button>
            <Button mode={"contained"} style={{ marginRight: 10 }} disabled={Boolean(usernameError)||Boolean(descriptionError)} onPress={() => {
              editMyData({ username, description });
              hide();
            }}>Save Changes</Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

type propsType = {
  visible: boolean;
  hide: () => void;
}

export default EditMyDataModal;
