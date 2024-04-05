import {updateTeam} from './utils';

const updateRolesPreference = updateTeam<Array<string>>((team, me, roles) => ({
  ...team,
  users: team.users.map(user =>
    me.id === user.id ? {...user, rolesPreference: roles} : user
  ),
}));

export default updateRolesPreference;
