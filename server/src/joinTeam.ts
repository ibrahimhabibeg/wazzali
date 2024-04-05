import {Server, Socket} from 'socket.io';
import generateUser from './user';
import {getTeam, storeTeam} from './persistence';
import {DefaultEventsMap} from 'socket.io/dist/typed-events';
import {Team, User} from './types';

const joinTeam =
  (
    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    socket: Socket
  ) =>
  async (code: string) => {
    if (typeof socket.data.teamCode === 'string') return;
    const team = await getTeam(code);
    if (!team) return;
    const user: User = {
      ...generateUser(team),
      isLeader: false,
      rolesPreference: team.roles.map(role => role.id),
    };
    const newTeam: Team = {
      ...team,
      users: [...team.users, user],
      ratings: [
        ...team.ratings,
        ...team.roles.flatMap(role => [
          ...team.users.flatMap(val => [
            {from: user.id, to: val.id, roleId: role.id, value: 3},
            {from: val.id, to: user.id, roleId: role.id, value: 3},
          ]),
        ]),
      ],
    };
    socket.data = {teamCode: team.code, id: user.id};
    socket.join(team.code);
    io.to(team.code).emit('data', newTeam);
    socket.emit('id', user.id);
    storeTeam(newTeam);
  };

export default joinTeam;
