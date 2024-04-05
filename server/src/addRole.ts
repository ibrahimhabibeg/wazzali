import {v4 as uuidv4} from 'uuid';
import {updateTeam} from './utils';

const addRole = updateTeam<{title: string; description: string}>(
  (team, user, role) => {
    if (!user?.isLeader) return;
    if (team.roles.some(val => val.title === role.title)) return;
    const newRole = {...role, id: uuidv4()};
    return {
      ...team,
      roles: [...team.roles, newRole],
      users: team.users.map(user => ({
        ...user,
        rolesPreference: [...user.rolesPreference, newRole.id],
      })),
    };
  }
);

export default addRole;
