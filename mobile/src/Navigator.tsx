import { NavigationContainer } from "@react-navigation/native";
import { ThemeContext } from "./Theme";
import { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JoinTeam from "./JoinTeam";

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="join"
          component={JoinTeam}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
