import { Server } from "socket.io";
import generateUser from "./user";

const io = new Server({});

const teams: string[] = [];

const doesContainTeamCode = (code: string) => teams.includes(code);

const addTeamCode = (code: string) => teams.push(code);

const generateNewTeamCode = () => {
  let code: string;
  do {
    code = Math.random().toString().slice(2, 10);
  } while (doesContainTeamCode(code));
  addTeamCode(code);
  return code;
};

io.on('connection', socket => {
  socket.on('createTeam', () => {
    if (typeof socket.data.teamCode === "string") return;
    const teamCode = generateNewTeamCode();
    const user = { ...generateUser({ users: [] }), isLeader: true };
    const team: Team = { code: teamCode, users: [user], roles: [] };
    socket.data = { teamCode: teamCode, username: user.username };
    socket.join(teamCode);
    io.to(teamCode).emit("data", team);
    socket.emit("me", user);
  });
});

io.listen(Number(process.env.PORT));

type User = { username: string; description: string; isLeader: boolean };
type Role = unknown;
type Team = {
  code: string;
  users: Array<User>;
  roles: Array<Role>;
};
