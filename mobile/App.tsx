import { ThemeProvider } from "./src/Theme";
import Navigator from "./src/Navigator";
import { SocketListener } from "./src/SocketListener";

export default function App() {
  return (
      <ThemeProvider>
        <SocketListener>
            <Navigator/>
        </SocketListener>
      </ThemeProvider>
  );
}
