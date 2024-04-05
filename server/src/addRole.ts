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
