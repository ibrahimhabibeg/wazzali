import { create } from "zustand";
import { Team, User } from "../types";

type storeSchema = {
  team: Team | null;
  me: User | null;
  setTeam: (team: Team) => void;
  setMe: (me: User) => void;
};
const useStore = create<storeSchema>((set) => ({
  team: null,
  me: null,
  setTeam: (team) => set((state) => ({ ...state, team })),
  setMe: (me) => set((state) => ({ ...state, me })),
}));

export default useStore;
