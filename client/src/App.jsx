import ChatRouter from "./components/router/ChatRouter";
import React, { useState } from "react";
import Context, { socket } from "./Context";

function App() {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [roomUsers, setRoomUsers] = useState([]);

    return (
        <>
            <Context.Provider
                value={{ username, setUsername, room, setRoom, socket, roomUsers, setRoomUsers }}
            >
                <ChatRouter />
            </Context.Provider>
        </>
    );
}

export default App;
