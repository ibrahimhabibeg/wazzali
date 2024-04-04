import {Server, Socket} from 'socket.io';
import {Role} from '.';
import {getTeam, storeTeam} from './persistence';
import {DefaultEventsMap} from 'socket.io/dist/typed-events';

const addRole =
  (
    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    socket: Socket
  ) =>
  async (role: Role) => {
    console.log(role);
    const {teamCode} = socket.data;
    if (typeof teamCode !== 'string') return;
    const team = await getTeam(teamCode);
    if (!team) return;
    const user = team.users.find(
      user => user.username === socket.data.username
    );
    if (!user?.isLeader) return;
    const newTeam = {...team, roles: [...team.roles, role]};
    storeTeam(newTeam);
    io.to(teamCode).emit('data', newTeam);
  };

export default addRole;
