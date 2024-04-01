import { Team } from "./index";

const teams: Team[] = [];

export const doesContainTeamCode = (code: string) =>
  teams.reduce((acc, team) => team.code === code || acc, false);
export const storeTeam = (team: Team) => teams.push(team);
