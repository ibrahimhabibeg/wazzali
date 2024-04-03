import socket from "./socket";

export const joinTeam = (code:string) => socket.emit('joinTeam', code);

export const createTeam = () => socket.emit('createTeam');

export const editMyData = (newData:{username:string|undefined, description:string|undefined}) => socket.emit('editMyData', newData);

export const editMyColor = (color:'blue'|'red'|'green'|'yellow') => socket.emit('editMyColor', color);
