import React, { useEffect, useState } from "react";

const Messages = ({ socket }) => {
    const [messagesReceived, setMessagesReceived] = useState([]);

    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log(data);
            setMessagesReceived((state) => [
                ...state,
                {
                    message: data.message,
                    username: data.username,
                    time: data.createdTime,
                },
            ]);
        });

        return () => socket.off("receive_message");
    }, [socket]);

    const formatDateTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString();
    };

    return (
        <div>
            {messagesReceived.map((message, index) => (
                <div className="bg-gray-400 rounded mb-4 max-w-xl p-3" key={index}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <span className="text-xs">{message.username}</span>
                        <span className="text-xs">
                            {formatDateTime(message.time)}
                        </span>
                    </div>
                    <p>{message.message}</p>
                    <br />
                </div>
            ))}
        </div>
    );
};

export default Messages;
