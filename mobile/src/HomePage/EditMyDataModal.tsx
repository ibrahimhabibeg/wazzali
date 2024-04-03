import useStore from "../Store/useStore";
import { useContext, useEffect, useState } from "react";
import { Button, Modal, Portal, Text, TextInput } from "react-native-paper";
import { View } from "react-native";
import { ThemeContext } from "../Theme/Theme";
import { editMyData } from "../Actions/actions";

const EditMyDataModal = ({ visible, hide }: propsType) => {
  const me = useStore(state => state.me);
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  useEffect(() => {
    if(!me) return;
    setUsername(me.username);
    setDescription(me.description);
  }, [me]);
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
              onChangeText={newVal => setUsername(newVal)}
            />
            <TextInput
              label={"Description"}
              mode={"outlined"}
              defaultValue={description}
              onChangeText={newVal => setDescription(newVal)}
              multiline={true}
              style={{ marginTop: 10 }}
            />
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
            <Button mode={"contained"} style={{ marginRight: 10 }} onPress={() => {
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
