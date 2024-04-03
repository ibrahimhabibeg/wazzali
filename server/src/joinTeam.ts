import {Server, Socket} from 'socket.io';
import generateUser from './user';
import {getTeam, storeTeam} from './persistence';
import {DefaultEventsMap} from 'socket.io/dist/typed-events';

const joinTeam =
  (
    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    socket: Socket
  ) =>
  (code: string) => {
    if (typeof socket.data.teamCode === 'string') return;
    const team = getTeam(code);
    if (!team) return;
    const user = {...generateUser(team), isLeader: false};
    const newTeam = {...team, users: [...team.users, user]};
    socket.data = {teamCode: team.code, username: user.username};
    socket.join(team.code);
    io.to(team.code).emit('data', newTeam);
    socket.emit('me', user);
    storeTeam(newTeam);
  };

export default joinTeam;
