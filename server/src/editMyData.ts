import {Server, Socket} from 'socket.io';
import {getTeam, storeTeam} from './persistence';
import {DefaultEventsMap} from 'socket.io/dist/typed-events';

const editMyData =
  (
    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    socket: Socket
  ) =>
  async ({username: newUsername, description: newDescription}: UserData) => {
    if (!newUsername) return;
    const {teamCode} = socket.data;
    if (typeof teamCode !== 'string') return;
    const oldTeam = await getTeam(teamCode);
    if (!oldTeam) return;
    const oldUsers = oldTeam.users;
    if (
      newUsername !== socket.data.username &&
      oldUsers.some(user => user.username === newUsername)
    )
      return;
    const oldUser = oldUsers.find(
      user => user.username === socket.data.username
    );
    if (!oldUser) return;
    const newUser = {
      ...oldUser,
      username: newUsername,
      description: newDescription,
    };
    const newUsers = [
      ...oldTeam.users.filter(user => user.username !== oldUser.username),
      newUser,
    ];
    console.log(newUsers);
    const newTeam = {
      ...oldTeam,
      users: newUsers,
    };
    storeTeam(newTeam);
    socket.data.username = newUser.username;
    io.to(teamCode).emit('data', newTeam);
    socket.emit('me', newUser);
  };

type UserData = {
  username: string;
  description: string;
};
export default editMyData;
