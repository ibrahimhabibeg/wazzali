import { Server } from "socket.io";
import createTeam from "./createTeam";

const io = new Server({});

io.on('connection', socket => {
  socket.on("createTeam", createTeam(io));
});

io.listen(Number(process.env.PORT));

export type User = { username: string; description: string; isLeader: boolean };
export type Role = unknown;
export type Team = {
  code: string;
  users: Array<User>;
  roles: Array<Role>;
};
