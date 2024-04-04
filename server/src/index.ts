import {Server} from 'socket.io';
import createTeam from './createTeam';
import joinTeam from './joinTeam';
import editMyData from './editMyData';
import editMyColor from './editMyColor';
import {Redis} from 'ioredis';
import {createAdapter} from '@socket.io/redis-adapter';
import addRole from './addRole';
import editRole from './editRole';

const pubClient = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
});
const subClient = pubClient.duplicate();

const io = new Server({adapter: createAdapter(pubClient, subClient)});

io.on('connection', socket => {
  socket.on('createTeam', createTeam(io, socket));
  socket.on('joinTeam', joinTeam(io, socket));
  socket.on('editMyData', editMyData(io, socket));
  socket.on('editMyColor', editMyColor(io, socket));
  socket.on('addRole', addRole(io, socket));
  socket.on('editRole', editRole(io, socket));
});

io.listen(Number(process.env.PORT));

export type User = {
  username: string;
  description: string;
  isLeader: boolean;
  color: Color;
};
export type Role = {
  title: string;
  description: string;
};
export type Team = {
  code: string;
  users: Array<User>;
  roles: Array<Role>;
};
export type Color = 'blue' | 'red' | 'yellow' | 'green';
