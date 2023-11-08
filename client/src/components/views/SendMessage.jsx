import React, { useState } from "react";

const SendMessage = ({ socket, username, room }) => {
    const [message, setMessage] = useState("");

    const sendMessage = (event) => {
        event.preventDefault();
        if (message !== "") {
            const timeElapsed = Date.now();
            let createdOn = new Date(timeElapsed);
            let socketId = socket.id;
            socket.emit("send_message", {
                username,
                room,
                message,
                socketId,
                createdOn,
            });
            setMessage("");
        }
        return false
    };

    return (
        <form className="flex justify-center py-4 px-5" onSubmit={sendMessage}>
            <input
                className="p-3 mr-4 w-9/12 rounded border border-cyan-600 text-sm"
                placeholder="Message..."
                onChange={(e) => setMessage(e.target.value)}
                value={message}
            />
            <button type="submit" className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded">
                Send Message
            </button>
        </form>
    );
};

export default SendMessage;
