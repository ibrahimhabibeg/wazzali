import {updateTeam} from './utils';

const deleteRole = updateTeam<string>((team, me, id) => {
  if (!me.isLeader) return;
  return {
    ...team,
    roles: team.roles.filter(role => role.id !== id),
    users: team.users.map(user => ({
      ...user,
      rolesPreference: user.rolesPreference.filter(val => val !== id),
    })),
  };
});

export default deleteRole;
