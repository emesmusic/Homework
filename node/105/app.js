import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';


const app = express();
const server = http.createServer(app);
const io = new Server(server);
server.listen(3000);

const __dirname = import.meta.dirname;
app.use(express.static(path.join(__dirname, 'public')));

let peopleInChat = [];

io.on('connection', (socket) => {
    let connectionUserName;
    socket.on('userName', (userName) => {
        connectionUserName = userName;

        if (peopleInChat.length !== 0) {
            socket.emit('peopleInChat', 'Chat with: ' + peopleInChat.join(', '));
            io.emit('join', connectionUserName + ' has joined the chat');
        }
        else{
            socket.emit('peopleInChat', 'You are alone in this chat');
        }
        peopleInChat.push(userName);

        
    });

    socket.on('message', (msg) => {
        socket.broadcast.emit('message', connectionUserName + ': ' + msg);
        socket.emit('selfMessage', msg);
    });

    socket.on('disconnect', () => {
        peopleInChat = peopleInChat.filter(userName => userName !== connectionUserName);
        if (connectionUserName) {
            io.emit('leave', connectionUserName + ' has left the chat');
        }

    })
})