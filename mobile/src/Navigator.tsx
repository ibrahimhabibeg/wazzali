import { NavigationContainer } from "@react-navigation/native";
import { ThemeContext } from "./Theme";
import { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JoinTeam from "./JoinTeam";
import useStore from "./useStore";
import { Text } from "react-native-paper";

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const { theme } = useContext(ThemeContext);
  const team = useStore(state => state.team);
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {
          team ? (
            <>
              <Stack.Screen
                name="home"
                component={()=>(<Text>Hello World!</Text>)}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="join"
                component={JoinTeam}
              />
            </>
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
