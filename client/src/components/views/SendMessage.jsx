import React, { useState } from "react";

const SendMessage = ({ socket, username, room }) => {
    const [message, setMessage] = useState("");

    const sendMessage = () => {
        if (message !== "") {
            const __createdTime__ = Date.now();
            socket.emit("send_message", {
                username,
                room,
                message,
                createdTime: __createdTime__,
            });
            setMessage("");
        }
    };

    return (
        <div className="py-4 px-5">
            <input
                className="p-3 mr-4 w-7/12 rounded border border-cyan-600 text-sm"
                placeholder="Message..."
                onChange={(e) => setMessage(e.target.value)}
                value={message}
            />
            <button className="btn btn-primary" onClick={sendMessage}>
                Send Message
            </button>
        </div>
    );
};

export default SendMessage;
