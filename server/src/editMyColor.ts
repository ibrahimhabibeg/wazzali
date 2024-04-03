import {Server, Socket} from 'socket.io';
import {getTeam, storeTeam} from './persistence';
import {DefaultEventsMap} from 'socket.io/dist/typed-events';

const editMyColor =
  (
    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    socket: Socket
  ) =>
  (color: 'blue' | 'red' | 'green' | 'yellow') => {
    const {teamCode} = socket.data;
    if (typeof teamCode !== 'string') return;
    const oldTeam = getTeam(teamCode);
    if (!oldTeam) return;
    const oldUser = oldTeam.users.find(
      user => user.username === socket.data.username
    );
    if (!oldUser) return;
    const newUser = {...oldUser, color};
    const newUsers = [
      ...oldTeam.users.filter(user => user.username !== oldUser.username),
      newUser,
    ];
    const newTeam = {...oldTeam, users: newUsers};
    storeTeam(newTeam);
    io.to(teamCode).emit('data', newTeam);
    socket.emit('me', newUser);
  };
export default editMyColor;
