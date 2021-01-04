import { Server, Socket } from "socket.io";
import { createServer } from 'http';
import { app } from "../app";


const server = createServer(app);

const io = new Server(server, {
    path: "/",
    serveClient: false,
    cookie: false,
    cors: {
        origin: 'http://localhost:8080',
    }
});

let connectedCount = 0;
let usernameList: Array<string> = [];
io.on('connection', (socket: Socket) => {
    connectedCount++;
    io.emit('connections', connectedCount);
    io.emit('joinGeneral', (usernameList));

    socket.on('chatMessageGeneral', (data) => {
        socket.broadcast.emit('chatMessageGeneral', data);
    });

    socket.on('isTypingGeneral', (username) => {
        socket.broadcast.emit('isTypingGeneral', username);
    });

    socket.on('stopTypingGeneral', () => {
        socket.broadcast.emit('stopTypingGeneral');
    });

    socket.on('joinGeneral', (username) => {
        usernameList.push(username);
        io.emit('joinGeneral', (usernameList));
    });

    socket.on('disconnectGeneral', (username) => {
        connectedCount--;
        usernameList = usernameList.filter((u: string) => {
            if (u != username) {
                return u;
            }
        });
        io.emit('connections', connectedCount);
        socket.broadcast.emit('disconnectGeneral', (usernameList));
    });

});

export default server;