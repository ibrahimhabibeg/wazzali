import { Avatar } from "react-native-paper";
import colorIconMap from "./colorIconMap";
import type { StyleProp, ViewStyle } from "react-native";

const UserIcon = ({color, size, style}:propsType) => {
  return(
    <Avatar.Image source={colorIconMap[color]} size={size||24} style={style}/>
  );
}

type propsType = {
  color: 'blue' | 'red' | 'green' | 'yellow';
  size?: number;
  style?: StyleProp<ViewStyle>
}

export default UserIcon;
