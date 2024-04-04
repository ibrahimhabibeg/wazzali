import {Server, Socket} from 'socket.io';
import {Team, User} from '.';
import {getTeam, storeTeam} from './persistence';
import {DefaultEventsMap} from 'socket.io/dist/typed-events';

const editRole =
  (
    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    socket: Socket
  ) =>
  async (data: {title: string; role: {title: string; description: string}}) => {
    const {teamCode} = socket.data;
    if (typeof teamCode !== 'string') return;
    const team = await getTeam(teamCode);
    if (!team) return;
    const user = team.users.find(val => val.username === socket.data.username);
    if (!user) return;
    const newTeam = createEditedTeam(team, user, data);
    storeTeam(newTeam);
    io.to(teamCode).emit('data', newTeam);
  };

const createEditedTeam = (
  team: Team,
  user: User,
  {
    title,
    role: {title: newTitle, description},
  }: {title: string; role: {title: string; description: string}}
): Team => {
  if (!user.isLeader) return team;
  const role = team.roles.find(val => val.title === title);
  if (!role) return team;
  const roleWithSameTitle = team.roles.find(val => val.title === newTitle);
  if (roleWithSameTitle) return team;
  return {
    ...team,
    roles: [
      ...team.roles.filter(val => val.title !== title),
      {...role, title: newTitle, description},
    ],
  };
};

export default editRole;
