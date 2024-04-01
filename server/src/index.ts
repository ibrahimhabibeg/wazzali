import { Server } from "socket.io";
import { generateUsername } from "./user";

const io = new Server({});

const teams: string[] = [];

const doesContainTeamId = (id: string) => teams.includes(id);

const addTeamId = (id: string) => teams.push(id);

const generateNewTeamId = () => {
  let id: string;
  do {
    id = Math.random().toString().slice(2, 10);
  } while (doesContainTeamId(id));
  addTeamId(id);
  return id;
};

io.on('connection', socket => {
  console.log('Hello World!');
  socket.on('createTeam', () => {
    if (typeof socket.data.teamId === 'string') return;
    const id = generateNewTeamId();
    const username = generateUsername({ users: [] });
    socket.data = { teamId: id, username };
    socket.join(id);
    io.to(id).emit('data', {teamId: id});
    console.log(id);
    console.log(username);
  });
});

io.listen(Number(process.env.PORT));
