import ChatRouter from "./components/router/ChatRouter";
import React, { useState } from "react";
import io from "socket.io-client";
import Context from "./Context";

function App() {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");

    const socket = io.connect("http://localhost:4000");

    return (
        <>
            <Context.Provider
                value={{ username, setUsername, room, setRoom, socket }}
            >
                <ChatRouter />
            </Context.Provider>
        </>
    );
}

export default App;
