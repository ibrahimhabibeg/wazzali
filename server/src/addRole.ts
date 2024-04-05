import {v4 as uuidv4} from 'uuid';
import {updateTeam} from './utils';

const addRole = updateTeam<{title: string; description: string}>(
  (team, user, role) => {
    if (!user?.isLeader) return;
    if (team.roles.some(val => val.title === role.title)) return;
    return {...team, roles: [...team.roles, {...role, id: uuidv4()}]};
  }
);

export default addRole;
