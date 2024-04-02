import { NavigationContainer } from "@react-navigation/native";
import { ThemeContext } from "./Theme";
import { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="join"
          component={() => (
              <SafeAreaView>
              <View>
                <Text>Hello World!</Text>
              </View>
            </SafeAreaView>
          )}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
