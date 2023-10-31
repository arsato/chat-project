import React from "react";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import RoomsAndUsers from "./RoomsAndUsers";

const Chat = ({ socket, username, room }) => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="max-w-6xl mx-0 my-auto grid grid-cols-4 gap-4">
                <div className="col-span-1">
                    <RoomsAndUsers
                        socket={socket}
                        username={username}
                        room={room}
                    />
                </div>
                <div className="col-span-3">
                    <Messages socket={socket} />
                    <SendMessage
                        socket={socket}
                        username={username}
                        room={room}
                    />
                </div>
            </div>
        </div>
    );
};

export default Chat;
