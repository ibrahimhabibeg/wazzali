export interface User {
  id: string
  username: string
  description: string
  isLeader: boolean
  color: Color
  rolesPreference: string[]
}
export interface Role {
  id: string
  title: string
  description: string
}
export interface Team {
  code: string
  users: User[]
  roles: Role[]
}
export type Color = 'blue' | 'red' | 'yellow' | 'green'
