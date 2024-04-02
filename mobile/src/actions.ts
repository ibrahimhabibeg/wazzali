import socket from "./socket";

export const joinTeam = (code:string) => socket.emit('joinTeam', code);

export const createTeam = () => socket.emit('createTeam');
