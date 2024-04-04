import {Server, Socket} from 'socket.io';
import {getTeam, storeTeam} from './persistence';
import {DefaultEventsMap} from 'socket.io/dist/typed-events';
import {Color} from './index';

const editMyColor =
  (
    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    socket: Socket
  ) =>
  async (color: Color) => {
    const {teamCode} = socket.data;
    if (typeof teamCode !== 'string') return;
    const oldTeam = await getTeam(teamCode);
    console.log(oldTeam);
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
    console.log(newTeam);
    storeTeam(newTeam);
    io.to(teamCode).emit('data', newTeam);
    socket.emit('me', newUser);
  };
export default editMyColor;
