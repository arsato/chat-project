import React, { useState } from "react";

const SendMessage = ({ socket, username, room }) => {
    const [message, setMessage] = useState("");

    const sendMessage = () => {
        if (message !== "") {
            const timeElapsed = Date.now();
            let createdOn = new Date(timeElapsed);
            socket.emit("send_message", {
                username,
                room,
                message,
                createdOn,
            });
            setMessage("");
        }
    };

    return (
        <div className="flex justify-center py-4 px-5">
            <input
                className="p-3 mr-4 w-9/12 rounded border border-cyan-600 text-sm"
                placeholder="Message..."
                onChange={(e) => setMessage(e.target.value)}
                value={message}
            />
            <button className="bg-cyan-600 hover:bg-cyan-400 text-white font-bold py-2 px-4 rounded" onClick={sendMessage}>
                Send Message
            </button>
        </div>
    );
};

export default SendMessage;
