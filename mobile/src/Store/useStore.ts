import { create } from 'zustand'
import { type Team, type User } from '../types'

interface storeSchema {
  id: string | null
  team: Team | null
  me: User | null
  setTeam: (team: Team) => void
  setId: (id: string) => void
}
const useStore = create<storeSchema>((set) => ({
  id: null,
  team: null,
  me: null,
  setTeam: (team) => {
    set((state) => ({
      ...state,
      team,
      me: team.users.find((user) => user.id === state.id)
    }))
  },
  setId: (id) => {
    set((state) => ({
      ...state,
      id,
      me: state.team?.users.find((user) => user.id === id)
    }))
  }
}))

export default useStore
