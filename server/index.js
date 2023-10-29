const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

const CHAT_BOT = "ChatBot";

let chatRoom = "";
let allUsers=[];

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        const { username, room } = data;
        socket.join(room);

        chatRoom = room;
        allUsers.push(username);
        chatRoomUsers = allUsers.filter((user) => user.room === room);

        let __createdTime__ = Date.now();

        socket.to(room).emit("receive_message", {
            message: `${username} has joined the chat room`,
            username: CHAT_BOT,
            createdTime: __createdTime__,
        }, chatRoomUsers);

        socket.emit("receive_message", {
            message: `Welcome ${username}`,
            username: CHAT_BOT,
            createdTime: __createdTime__,
        }, chatRoomUsers);
    });
});

server.listen(4000, () => {
    console.log("Server is running on port 4000");
});
