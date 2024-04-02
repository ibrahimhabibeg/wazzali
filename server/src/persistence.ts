import {Team} from './index';

const teams: Team[] = [];

export const doesContainTeamCode = (code: string) =>
  teams.reduce((acc, team) => team.code === code || acc, false);
export const storeTeam = (team: Team) => teams.push(team);

export const getTeam = (code: string) => {
  const filteredTeams = teams.filter(team => team.code === code);
  return filteredTeams.length > 0 ? filteredTeams[0] : null;
};
