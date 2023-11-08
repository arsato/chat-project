import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../../Context";

const RoomsAndUsers = ({ socket, username, room }) => {
    const {roomUsers, setRoomUsers} = useContext(Context);

    const navigate = useNavigate();

    useEffect(() => {
        socket.on("chatroom_users", (data) => {
            setRoomUsers(data);
        });
        return () => socket.off("chatroom_users");
    }, [socket]);

    const leaveRoom = () => {
        const timeElapsed = Date.now();
        let createdOn = new Date(timeElapsed);
        socket.emit("leave_room", { username, room, createdOn });
        navigate("/", { replace: true });
    };

    return (
        <div className="border-r-2 border-cyan-500 h-[85vh] bg-stone-300">
            <h2 className="mb-5 uppercase text-4xl text-cyan-700">{room}</h2>

            <div>
                {roomUsers.length > 0 && (
                    <h5 className="text-cyan-900 text-xl">Users:</h5>
                )}
                <ul className="pl-0 mb-16 text-cyan-700">
                    {roomUsers.map((user) => (
                        <li className="mb-2" key={user.id}>
                            {user.username}
                        </li>
                    ))}
                </ul>
            </div>

            <button
                className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
                onClick={leaveRoom}
            >
                Leave
            </button>
        </div>
    );
};

export default RoomsAndUsers;
