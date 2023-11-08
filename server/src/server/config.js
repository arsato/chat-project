require("dotenv").config();
const { Server } = require("socket.io");
const http = require("http");

//Config
const setApp = app => {
    app.set('port', process.env.PORT || 3000);

    return app;
}

const createServer = app => {
    const server = http.createServer(app);

    return server;
}

const ioServer = server => {

    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
        },
    });

    return io;
}


module.exports = {setApp, ioServer, createServer}