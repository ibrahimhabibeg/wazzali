import {RoleIcon} from './types';
import {updateTeam} from './utils';

const setRoleIcon = updateTeam<{roleId: string; icon: RoleIcon}>(
  (team, me, {roleId, icon}) => ({
    ...team,
    roles: team.roles.map(role =>
      role.id === roleId ? {...role, icon} : role
    ),
  })
);

export default setRoleIcon;
