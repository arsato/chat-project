const express = require("express");
const {setApp, ioServer, createServer} = require("./server/config")
const cors = require("cors");
const saveMessageToDB = require("./services/save-message");
const getMessages = require("./services/get-messages");
const leaveRoom = require("./utils/leave-room");
const formatDate = require("./utils/format-date");
require("./database")

const app = setApp(express());
app.use(cors());
const server = createServer(app);
const io = ioServer(server);

const CHAT_BOT = "ChatBot";
let chatRoom = "";
let allUsers = [];

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        const { username, room} = data;
        socket.join(room);
        chatRoom = room;
        allUsers.push({ id: socket.id, username, room });
        chatRoomUsers = allUsers.filter((user) => user.room === room);

        const timeElapsed = Date.now();
        let createdOn = new Date(timeElapsed);
        let messageDate = formatDate(createdOn);

        socket.to(room).emit("chatroom_users", chatRoomUsers);

        socket.emit("chatroom_users", chatRoomUsers);

        socket.to(room).emit(
            "receive_message",
            {
                message: `${username} has joined the chat room`,
                username: CHAT_BOT,
                createdOn,
                messageDate,
            },
            chatRoomUsers
        );

        socket.emit(
            "receive_message",
            {
                message: `Welcome ${username}`,
                username: CHAT_BOT,
                createdOn,
                messageDate,
            },
            chatRoomUsers
        );

        getMessages(room)
            .then((lastmessages) => {
                socket.emit("last_100_messages", lastmessages);
            })
            .catch((error) => console.log(error));
    });

    socket.on("send_message", (data) => {
        const timeElapsed = Date.now();
        let createdOn = new Date(timeElapsed);
        let messageDate = formatDate(createdOn);

        const { message, username, room, socketId } = data;
        let sent = { message, username, room, socketId, messageDate, createdOn };
        io.in(room).emit("receive_message", sent);
        saveMessageToDB(sent)
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
    });

    socket.on("leave_room", (data) => {
        const { username, room } = data;
        socket.leave(room);
        const timeElapsed = Date.now();
        let createdOn = new Date(timeElapsed);
        let messageDate = formatDate(createdOn);

        allUsers = leaveRoom(socket.id, allUsers);
        socket.to(room).emit("chatroom_users", allUsers);
        socket.to(room).emit("receive_message", {
            message: `${username} has left the chat room`,
            username: CHAT_BOT,
            createdOn,
            messageDate,
        });
        console.log(`${username} has left the chat room`);
    });

    socket.on("disconnect", () => {
        console.log(`User Disconnected: ${socket.id}`);
        const user = allUsers.find((user) => user.id === socket.id);
        if (user?.username) {
            allUsers = leaveRoom(socket.id, allUsers);
            socket.to(chatRoom).emit("chatroom_users", allUsers);
            socket.to(chatRoom).emit("receive_message", {
                message: `${user.username} has left the chat room`,
            });
        }
    });
});

server.listen(app.get("port"), () => {
    console.log("Server is running on port", app.get("port"));
});
