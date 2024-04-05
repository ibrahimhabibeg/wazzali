import {updateTeam} from './utils';

const deleteRole = updateTeam<string>((team, me, id) => {
  if (!me.isLeader) return;
  return {
    ...team,
    roles: team.roles.filter(role => role.id !== id),
  };
});

export default deleteRole;
