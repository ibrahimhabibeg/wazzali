import socket from '../Socket/socket'
import { type RoleIcon, type Color } from '../types'

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

export const addRole = (role: { title: string, description: string }): void => {
  socket.emit('addRole', role)
}

export const editRole = (data: {
  id: string
  role: { title: string, description: string }
}): void => {
  socket.emit('editRole', data)
}

export const deleteRole = (id: string): void => {
  socket.emit('deleteRole', id)
}

export const updateRolesPreference = (ids: string[]): void => {
  socket.emit('updateRolesPreference', ids)
}

export const rate = (data: {
  userId: string
  roleId: string
  value: number
}): void => {
  socket.emit('rate', data)
}

export const setRoleIcon = (data: { roleId: string, icon: RoleIcon }): void => {
  socket.emit('setRoleIcon', data)
}

export const distributeRoles = (): void => {
  socket.emit('distributeRoles')
}

export const resetDistribution = (): void => {
  socket.emit('resetDistribution')
}
