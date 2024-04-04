export interface User {
  username: string
  description: string
  isLeader: boolean
  color: Color
}
export type Role = unknown
export interface Team {
  code: string
  users: User[]
  roles: Role[]
}
export type Color = 'blue' | 'red' | 'yellow' | 'green'
