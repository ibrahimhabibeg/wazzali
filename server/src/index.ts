import {Server} from 'socket.io';
import createTeam from './createTeam';
import joinTeam from './joinTeam';
import editMyData from './editMyData';

const io = new Server({});

io.on('connection', socket => {
  socket.on('createTeam', createTeam(io, socket));
  socket.on('joinTeam', joinTeam(io, socket));
  socket.on('editMyData', editMyData(io, socket));
});

io.listen(Number(process.env.PORT));

export type User = {
  username: string;
  description: string;
  isLeader: boolean;
  color: 'blue' | 'red' | 'yellow' | 'green';
};
export type Role = unknown;
export type Team = {
  code: string;
  users: Array<User>;
  roles: Array<Role>;
};
