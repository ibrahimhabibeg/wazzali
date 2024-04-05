import {Server, Socket} from 'socket.io';
import generateUser from './user';
import {getTeam, storeTeam} from './persistence';
import {DefaultEventsMap} from 'socket.io/dist/typed-events';
import {User} from '.';

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
    const newTeam = {...team, users: [...team.users, user]};
    socket.data = {teamCode: team.code, id: user.id};
    socket.join(team.code);
    io.to(team.code).emit('data', newTeam);
    socket.emit('id', user.id);
    storeTeam(newTeam);
  };

export default joinTeam;
