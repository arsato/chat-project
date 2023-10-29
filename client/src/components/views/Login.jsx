import React from "react";
import LoginCard from "../cards/LoginCard";
import { useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4000");

const Login = () => {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <LoginCard
                username={username}
                setUsername={setUsername}
                room={room}
                setRoom={setRoom}
                socket={socket}
            />
        </div>
    );
};

export default Login;
