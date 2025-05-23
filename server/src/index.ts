import {Server} from 'socket.io';
import createTeam from './createTeam';
import joinTeam from './joinTeam';
import editMyData from './editMyData';
import editMyColor from './editMyColor';
import {Redis} from 'ioredis';
import {createAdapter} from '@socket.io/redis-adapter';
import addRole from './addRole';
import editRole from './editRole';
import deleteRole from './deleteRole';
import updateRolesPreference from './updateRolesPreference';
import rate from './rate';
import setRoleIcon from './setRoleIcon';
import distributeRoles from './distributeRoles';
import resetDistribution from './resetDistribution';
import disonnect from './disconnect';

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
  socket.on('deleteRole', deleteRole(io, socket));
  socket.on('updateRolesPreference', updateRolesPreference(io, socket));
  socket.on('rate', rate(io, socket));
  socket.on('setRoleIcon', setRoleIcon(io, socket));
  socket.on('distributeRoles', distributeRoles(io, socket));
  socket.on('resetDistribution', resetDistribution(io, socket));
  socket.on('disconnect', disonnect(io, socket));
});

io.listen(Number(process.env.PORT));
