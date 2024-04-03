import { Modal, Portal } from "react-native-paper";
import { Pressable, View } from "react-native";
import UserIcon from "../Components/UserIcon";
import { editMyColor } from "../Actions/actions";
import { Color } from "../types";

const colors: Array<Color> = ['blue', 'red', 'green', 'yellow'];

const EditMyColor = ({visible, hide}:propsType) => {
  const submitColor = (color:Color) => {
    editMyColor(color);
    hide();
  }

  return (
    <Portal>
      <Modal visible={visible} onDismiss={hide}>
        <View style={{width:"85%", flexDirection:"row", justifyContent:"space-around", alignSelf:"center", flexWrap:"wrap"}}>
          {
            colors.map(color=>(
              <Pressable onPress={()=>submitColor(color)} key={color} >
                <UserIcon color={color} size={50}/>
              </Pressable>
            ))
          }
        </View>
      </Modal>
    </Portal>
  );
};

type propsType = {
  visible: boolean;
  hide: () => void;
}

export default EditMyColor;
