import { ThemeProvider } from "./src/Theme";
import Navigator from "./src/Navigator";

export default function App() {
  return (
      <ThemeProvider>
        <Navigator/>
      </ThemeProvider>
  );
}
