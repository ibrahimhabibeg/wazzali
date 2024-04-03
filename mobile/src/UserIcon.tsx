import { Avatar } from "react-native-paper";
import colorIconMap from "./colorIconMap";
import type { StyleProp, ViewStyle } from "react-native";
import { Color } from "./types";

const UserIcon = ({color, size, style}:propsType) => {
  return(
    <Avatar.Image source={colorIconMap[color]} size={size||24} style={style}/>
  );
}

type propsType = {
  color: Color;
  size?: number;
  style?: StyleProp<ViewStyle>
}

export default UserIcon;
