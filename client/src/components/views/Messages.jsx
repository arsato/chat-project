import React, { useEffect, useRef, useState } from "react";
import "../../messages.css";

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
                    socketId: data.socketId,
                    messageDate: data.messageDate,
                },
            ]);
        });

        return () => socket.off("receive_message");
    }, [socket]);

    useEffect(() => {
        socket.on("last_100_messages", (last100Messages) => {
            // Sort messages by createdOn
            last100Messages = sortMessagesByDate(last100Messages);
            setMessagesReceived((state) => [...last100Messages, ...state]);
        });

        return () => socket.off("last_100_messages");
    }, [socket]);

    // Scroll to most recent message
    useEffect(() => {
        messagesColumnRef.current.scrollTop =
            messagesColumnRef.current.scrollHeight;
    }, [messagesReceived]);

    const sortMessagesByDate = (messages) => {
        let sortedMessages = messages.sort((p1, p2) =>
            p1.createdOn > p2.createdOn
                ? 1
                : p1.createdOn < p2.createdOn
                ? -1
                : 0
        );
        return sortedMessages;
    };

    const groupMessagesByDate = (messages) => {
        const dates = messages.reduce((obj, item) => {
            if (obj[item.messageDate]) {
                obj[item.messageDate].push(item);
                return obj;
            }

            obj[item.messageDate] = [{ ...item }];
            return obj;
        }, {});

        return dates;
    };

    const formatTime = (date) => {
        const now = new Date(date);
        return now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div
            className="py-3 h-[85vh] overflow-auto bg-stone-300"
            ref={messagesColumnRef}
        >
            {Object.keys(groupMessagesByDate(messagesReceived)).map((date) => (
                <div className="flex flex-grow flex-col px-10">
                    <div
                        className="bg-gray-300 rounded-lg p-2 mr-auto ml-auto text-xs"
                        key={date}
                    >
                        {date}
                    </div>
                    <div className="flex flex-grow flex-col px-10">
                        {groupMessagesByDate(messagesReceived)[date].map(
                            (message, index) => (
                                <div
                                    className={
                                        message.socketId === socket.id
                                            ? "bg-green-200 rounded-lg rounded-tr-none my-1 p-2 ml-auto text-sm flex flex-col relative speech-bubble-right min-w-[150px]"
                                            : "bg-gray-200 rounded-lg rounded-tl-none my-1 p-2 mr-auto text-sm flex flex-col relative speech-bubble-left min-w-[150px]"
                                    }
                                    key={index}
                                >
                                    <span className="text-xs leading-none text-gray-500">
                                        {message.username}
                                    </span>
                                    <p className="text-sm">{message.message}</p>
                                    <span className="text-xs text-right leading-none text-gray-500">
                                        {formatTime(message.createdOn)}
                                    </span>
                                </div>
                            )
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Messages;
