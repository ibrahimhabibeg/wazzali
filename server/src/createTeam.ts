import {Server, Socket} from 'socket.io';
import generateNewTeamCode from './team';
import generateUser from './user';
import {storeTeam} from './persistence';
import {Team} from './index';
import {DefaultEventsMap} from 'socket.io/dist/typed-events';

const createTeam =
  (
    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    socket: Socket
  ) =>
  async () => {
    if (typeof socket.data?.teamCode === 'string') return;
    const teamCode = await generateNewTeamCode();
    const user = {...generateUser({users: []}), isLeader: true};
    const team: Team = {code: teamCode, users: [user], roles: []};
    socket.data = {teamCode: teamCode, id: user.id};
    socket.join(teamCode);
    io.to(teamCode).emit('data', team);
    socket.emit('id', user.id);
    storeTeam(team);
  };

export default createTeam;
