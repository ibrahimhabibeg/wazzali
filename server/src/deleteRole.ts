import {updateTeam} from './utils';

const deleteRole = updateTeam<string>((team, me, title) => {
  if (!me.isLeader) return;
  return {
    ...team,
    roles: team.roles.filter(role => role.title !== title),
  };
});

export default deleteRole;
