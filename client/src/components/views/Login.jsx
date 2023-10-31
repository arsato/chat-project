import React, { useContext } from "react";
import LoginCard from "../cards/LoginCard";
import Context from "../../Context";

const Login = () => {
    const { username, setUsername, room, setRoom, socket } =
        useContext(Context);

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
