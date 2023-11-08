import React from "react";
import { useNavigate } from "react-router-dom";

const LoginCard = ({ username, setUsername, room, setRoom, socket }) => {
    const navigate = useNavigate();

    const joinRoom = () => {
        if (username != "" && room != "") {
            let socketId = socket.id;
            socket.emit("join_room", { username, room, socketId });
        }
        navigate("/chat");
    };

    return (
        <div className="w-full max-w-xs">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1 className="text-2xl font-bold text-center mb-4">
                    Chat Room
                </h1>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="username"
                    >
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    ></input>
                </div>
                <div className="mb-6">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="rooms"
                    >
                        Room
                    </label>
                    <select
                        id="rooms"
                        className="block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        onChange={(e) => setRoom(e.target.value)}
                    >
                        <option>Select Room</option>
                        <option value="Front-End development">
                            Front-End development
                        </option>
                        <option value="Back-End development">
                            Back-End development
                        </option>
                        <option value="Full-Stack development">
                            Full-Stack development
                        </option>
                    </select>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="w-full bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={joinRoom}
                    >
                        Join Room
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginCard;
