import {Server, Socket} from 'socket.io';
import {getTeam, storeTeam} from './persistence';
import {DefaultEventsMap} from 'socket.io/dist/typed-events';

const editMyData =
  (
    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    socket: Socket
  ) =>
  ({username: newUsername, description: newDescription}: UserData) => {
    if (!newUsername) return;
    const {teamCode} = socket.data;
    if (typeof teamCode !== 'string') return;
    const oldTeam = getTeam(teamCode);
    if (!oldTeam) return;
    const oldUsers = oldTeam.users;
    if (oldUsers.some(user => user.username === newUsername)) return;
    const oldUser = oldUsers.find(
      user => user.username === socket.data.username
    );
    if (!oldUser) return;
    const newUser = {
      ...oldUser,
      username: newUsername,
      description: newDescription,
    };
    const newUsers = [...oldTeam.users, newUser].filter(
      user => user.username !== oldUser.username
    );
    const newTeam = {
      ...oldTeam,
      users: newUsers,
    };
    storeTeam(newTeam);
    io.to(teamCode).emit('data', newTeam);
    socket.emit('me', newUser);
  };

type UserData = {
  username: string;
  description: string;
};
export default editMyData;
