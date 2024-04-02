import { Button } from "react-native-paper";
import { useContext } from "react";
import { ThemeContext } from "./Theme";

const ChangeThemeButton = () => {
  const { toggleTheme} = useContext(ThemeContext);
  return(
    <Button onPress={toggleTheme}>
      Change Theme
    </Button>
  )
}

export default ChangeThemeButton;
