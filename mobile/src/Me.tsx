import { Pressable, View } from "react-native";
import { Icon, Text } from "react-native-paper";
import { useContext, useState } from "react";
import { ThemeContext } from "./Theme";
import useStore from "./useStore";
import EditMyDataModal from "./EditMyDataModal";
import UserIcon from "./UserIcon";

const Me = () => {
  const me = useStore(state => state.me);
  const { theme } = useContext(ThemeContext);
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      <View style={{ alignItems: "center", width: "85%", marginTop: 20, minHeight: 200, borderWidth:1, borderRadius: 10, borderColor:theme.colors.border, paddingVertical:10, paddingHorizontal:15 }}>
          <Pressable style={{ alignSelf: "flex-end" }} onPress={() => setIsEditing(val => !val)}>
            <Icon size={22} source={"square-edit-outline"} />
          </Pressable>
          <UserIcon color={me?.color || 'blue'} size={50}/>
          <Text variant={"headlineSmall"} style={{ marginTop: 10, textAlign:"center" }}>{me?.username}</Text>
          <Text style={{ textAlign: "center", marginTop: 20, marginBottom: 30 }}>{me?.description}</Text>
      </View>
      <EditMyDataModal visible={isEditing} hide={()=>setIsEditing(false)}/>
    </>
  );
};

export default Me;
