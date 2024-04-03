import socket from "./socket";
import { Color } from "./types";

export const joinTeam = (code:string) => socket.emit('joinTeam', code);

export const createTeam = () => socket.emit('createTeam');

export const editMyData = (newData:{username:string|undefined, description:string|undefined}) => socket.emit('editMyData', newData);

export const editMyColor = (color:Color) => socket.emit('editMyColor', color);
