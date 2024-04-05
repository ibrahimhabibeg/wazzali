import {Server, Socket} from 'socket.io';
import {Team, User} from './types';
import {DefaultEventsMap} from 'socket.io/dist/typed-events';
import {getTeam, storeTeam} from './persistence';

export const updateTeam =
  <DataType>(
    teamUpdateFunction: (
      team: Team,
      user: User,
      data: DataType
    ) => Team | null | void
  ) =>
  (
    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    socket: Socket
  ) =>
  async (data: DataType) => {
    const {teamCode} = socket.data;
    if (typeof teamCode !== 'string') return;
    const team = await getTeam(teamCode);
    if (!team) return;
    const user = team.users.find(val => val.id === socket.data.id);
    if (!user) return;
    const newTeam = teamUpdateFunction(team, user, data);
    if (newTeam) {
      storeTeam(newTeam);
      io.to(teamCode).emit('data', newTeam);
    }
  };
