import { ThemeProvider } from "./src/Theme";
import Navigator from "./src/Navigator";
import { SocketProvider } from "./src/SocketProvider";
import StateManagement from "./src/StateManagement";

export default function App() {
  return (
      <ThemeProvider>
        <SocketProvider>
          <StateManagement>
            <Navigator/>
          </StateManagement>
        </SocketProvider>
      </ThemeProvider>
  );
}
