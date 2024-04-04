import socket from '../Socket/socket'
import { type Color, type Role } from '../types'

export const joinTeam = (code: string): void => {
  socket.emit('joinTeam', code)
}

export const createTeam = (): void => {
  socket.emit('createTeam')
}

export const editMyData = (newData: {
  username: string | undefined
  description: string | undefined
}): void => {
  socket.emit('editMyData', newData)
}

export const editMyColor = (color: Color): void => {
  socket.emit('editMyColor', color)
}

export const addRole = (role: Role): void => {
  socket.emit('addRole', role)
}
