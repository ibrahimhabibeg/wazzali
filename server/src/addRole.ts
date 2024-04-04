import {Role} from '.';
import {updateTeam} from './utils';

const addRole = updateTeam<Role>((team, user, role) => {
  if (!user?.isLeader) return;
  if (team.roles.some(val => val.title === role.title)) return;
  return {...team, roles: [...team.roles, role]};
});

export default addRole;
