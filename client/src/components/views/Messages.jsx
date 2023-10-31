import React, { useEffect, useRef, useState } from "react";

const Messages = ({ socket }) => {
    const [messagesReceived, setMessagesReceived] = useState([]);

    const messagesColumnRef = useRef(null);

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessagesReceived((state) => [
                ...state,
                {
                    message: data.message,
                    username: data.username,
                    createdOn: data.createdOn,
                },
            ]);
        });

        return () => socket.off("receive_message");
    }, [socket]);

    // Add this
    useEffect(() => {
        // Last 100 messages sent in the chat room (fetched from the db in backend)
        socket.on("last_100_messages", (last100Messages) => {
            // Sort these messages by createdOn
            last100Messages = sortMessagesByDate(last100Messages);
            setMessagesReceived((state) => [...last100Messages, ...state]);
        });

        return () => socket.off("last_100_messages");
    }, [socket]);

    // Add this
    // Scroll to the most recent message
    useEffect(() => {
        messagesColumnRef.current.scrollTop =
            messagesColumnRef.current.scrollHeight;
    }, [messagesReceived]);

    function sortMessagesByDate(messages) {
        let sortedMessages = messages.sort((p1, p2) =>
            p1.createdOn > p2.createdOn
                ? 1
                : p1.createdOn < p2.createdOn
                ? -1
                : 0
        );
        return sortedMessages;
    }

    const formatDateTime = (date) => {
        const now = new Date(date);
        return now.toLocaleString();
    };

    return (
        <div
            className="pl-5 py-3 pr-3 h-[85vh] overflow-auto border"
            ref={messagesColumnRef}
        >
            {messagesReceived.map((message, index) => (
                <div className="bg-gray-400 rounded mb-4 p-3" key={index}>
                    <div className="flex justify-between">
                        <span className="text-xs">{message.username}</span>
                        <span className="text-xs">
                            {formatDateTime(message.createdOn)}
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
