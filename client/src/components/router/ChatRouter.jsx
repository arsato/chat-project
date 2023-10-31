import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../views/Login";
import Chat from "../views/Chat";
import Context from "../../Context";

const Router = () => {
    const { username, room, socket } = useContext(Context);
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route
                path="/chat"
                element={
                    <Chat username={username} room={room} socket={socket} />
                }
            />
        </Routes>
    );
};

export default Router;
