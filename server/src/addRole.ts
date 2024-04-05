import {updateTeam} from './utils';
import createRole from './role';

const addRole = updateTeam<{title: string; description: string}>(
  (team, user, role) => {
    if (!user?.isLeader) return;
    if (team.roles.some(val => val.title === role.title)) return;
    const newRole = createRole(role);
    return {
      ...team,
      roles: [...team.roles, newRole],
      users: team.users.map(user => ({
        ...user,
        rolesPreference: [...user.rolesPreference, newRole.id],
      })),
      ratings: [
        ...team.ratings,
        ...team.users.flatMap(user1 => [
          ...team.users.flatMap(user2 => [
            {from: user1.id, to: user2.id, roleId: newRole.id, value: 3},
            {from: user2.id, to: user1.id, roleId: newRole.id, value: 3},
          ]),
        ]),
      ],
    };
  }
);

export default addRole;
