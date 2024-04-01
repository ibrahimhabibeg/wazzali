import {Server} from 'socket.io';

const io = new Server({});

io.on('connection', socket => {
  console.log('Hello World!');
});

io.listen(Number(process.env.PORT));
