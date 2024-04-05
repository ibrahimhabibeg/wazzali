import React from 'react'
import { ThemeProvider } from './src/Theme/Theme'
import Navigator from './src/Navigation/Navigator'
import { SocketListener } from './src/Socket/SocketListener'

export default function App (): React.JSX.Element {
  return (
    <ThemeProvider>
      <SocketListener>
        <Navigator />
      </SocketListener>
    </ThemeProvider>
  )
}
