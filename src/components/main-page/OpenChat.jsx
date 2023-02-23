// import React from "react"
// import AddMessage from "./AddMessage"

// export default function OpenChat() {
//   return (
//     <div className="d-flex flex-column h-100">
//       <div id="chat-info">chat info</div>
//       <div id="chat">chat</div>
//       <AddMessage />
//     </div>
//   )
// }

import React, { useState, useEffect, useRef } from "react";
import AddMessage from "./AddMessage";
import io from "socket.io-client";

export default function OpenChat({ roomId }) {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const roomIdRef = useRef(roomId);

  useEffect(() => {
    if (!socket) {
      const newSocket = io("http://localhost:3002");

      newSocket.on("connect", () => {
        console.log("Connected to socket server");
        newSocket.emit("openChat", roomIdRef.current);
      });

      newSocket.on("newMessage", (message) => {
        console.log("Received new message:", message);
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      setSocket(newSocket);
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket, roomIdRef]);

  return (
    <div className="d-flex flex-column h-100">
      <div id="chat-info">chat info</div>
      <div id="chat">
        {messages.map((message, index) => (
          <div key={index}>
            <span>{message.user}: </span>
            <span>{message.text}</span>
          </div>
        ))}
      </div>
      <AddMessage />
    </div>
  )
}


