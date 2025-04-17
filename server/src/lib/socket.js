import {Server} from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
    }
});

export function getRecieverSocketId (userId) {
    return userSocketMap[userId];
}

//used to store online users id
const userSocketMap = {}; //{userId: socketId}

io.on("connection", (socket) => {
    console.log("user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if(userId) userSocketMap[userId] = socket.id; //store user id and socket id

    io.emit("getOnlineUsers", Object.keys(userSocketMap)); //emit online user id to all clients

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap)); //emit online user id to all clients
    })
})


export {io, server, app};