import type { JSX } from 'react'
import { createContext, useEffect } from 'react'
import { io } from 'socket.io-client'
import socket from './socket'
import { type Team } from '../types'
import useStore from '../Store/useStore'

export const SocketContext = createContext({
  socket: io()
})

export const SocketListener = ({
  children
}: {
  children: JSX.Element
}): React.JSX.Element => {
  const setTeam = useStore((state) => state.setTeam)
  const setId = useStore((state) => state.setId)

  useEffect(() => {
    socket.on('id', (id: string) => {
      setId(id ?? '')
    })
    socket.on('data', (team: Team) => {
      setTeam(team)
    })
    return () => {
      socket.off('data', (team: Team) => {
        setTeam(team)
      })
      socket.off('id', (id: string) => {
        setId(id ?? '')
      })
    }
  }, [setId, setTeam])

  return children
}
