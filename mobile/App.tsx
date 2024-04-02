import { View } from 'react-native';
import { ThemeProvider } from "./src/Theme";
import { Text } from "react-native-paper";

export default function App() {
  return (
    <ThemeProvider>
      <View>
        <Text>Open up App.tsx to start working on your app!</Text>
      </View>
    </ThemeProvider>
  );
}
