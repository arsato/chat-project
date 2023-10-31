const express = require("express");
const oracledb = require("oracledb");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const saveMessageToDB = require("./services/save-message");
const getMessages = require("./services/get-messages");
const leaveRoom = require("./utils/leave-room");
const { Socket } = require("dgram");
require("dotenv").config();

oracledb.outFormat = oracledb.OBJECT;
oracledb.fetchAsString = [oracledb.CLOB];
oracledb.initOracleClient({
    libDir: "C:\\oracle\\instantclient_21_11",
    configDir: "C:\\oracle\\instantclient_21_11\\network\\admin",
});
oracledb.autoCommit = true;

const init = async () => {
    try {
        console.log("Creando pool de conexiones...");
        await oracledb.createPool({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            connectString: process.env.CONNECT_STRING,
        });
        console.log("Pool de conexiones creado.");
    } catch (e) {
        console.log("Error en conexion: ");
        console.log(e);
    }
};

init();

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
let allUsers = [];

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        const { username, room } = data;
        socket.join(room);

        chatRoom = room;
        allUsers.push({ id: socket.id, username, room });
        chatRoomUsers = allUsers.filter((user) => user.room === room);

        const timeElapsed = Date.now();
        let createdOn = new Date(timeElapsed);

        socket.to(room).emit("chatroom_users", chatRoomUsers);

        socket.emit("chatroom_users", chatRoomUsers);

        socket.to(room).emit(
            "receive_message",
            {
                message: `${username} has joined the chat room`,
                username: CHAT_BOT,
                createdOn: createdOn,
            },
            chatRoomUsers
        );

        socket.emit(
            "receive_message",
            {
                message: `Welcome ${username}`,
                username: CHAT_BOT,
                createdOn: createdOn,
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
        const { message, username, room, createdOn } = data;
        console.log("data: ", data);
        let sent = { message, username, room };
        io.in(room).emit("receive_message", data);
        saveMessageToDB(sent)
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
    });

    socket.on("leave_room", (data) => {
        const { username, room } = data;
        socket.leave(room);
        const timeElapsed = Date.now();
        let createdOn = new Date(timeElapsed);
        allUsers = leaveRoom(socket.id, allUsers);
        socket.to(room).emit("chatroom_users", allUsers);
        socket.to(room).emit("receive_message", {
            message: `${username} has left the chat room`,
            username: CHAT_BOT,
            createdOn,
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

server.listen(4000, () => {
    console.log("Server is running on port 4000");
});
