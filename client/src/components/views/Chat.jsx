import React from 'react'
import Messages from './Messages'
import SendMessage from './SendMessage'

const Chat = ({socket, username, room}) => {
  return (
    <div>
        <Messages socket={socket} />
        <SendMessage socket={socket} username={username} room={room}/>
    </div>
  )
}

export default Chat