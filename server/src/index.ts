import {Server} from 'socket.io';
import createTeam from './createTeam';
import joinTeam from './joinTeam';
import editMyData from './editMyData';
import editMyColor from './editMyColor';
import {Redis} from 'ioredis';
import {createAdapter} from '@socket.io/redis-adapter';

const pubClient = new Redis({host: 'redis', port: 6379});
const subClient = pubClient.duplicate();

const io = new Server({adapter: createAdapter(pubClient, subClient)});

io.on('connection', socket => {
  socket.on('createTeam', createTeam(io, socket));
  socket.on('joinTeam', joinTeam(io, socket));
  socket.on('editMyData', editMyData(io, socket));
  socket.on('editMyColor', editMyColor(io, socket));
});

io.listen(Number(process.env.PORT));

export type User = {
  username: string;
  description: string;
  isLeader: boolean;
  color: Color;
};
export type Role = unknown;
export type Team = {
  code: string;
  users: Array<User>;
  roles: Array<Role>;
};
export type Color = 'blue' | 'red' | 'yellow' | 'green';
