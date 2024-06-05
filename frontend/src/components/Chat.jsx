import React, { useState, useEffect, useRef } from "react";

const socket = new WebSocket("ws://localhost:3001");

const Chat = ({ currentChat, addMessage }) => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (currentChat) {
      setChat(currentChat.messages);
    }
  }, [currentChat]);

  useEffect(() => {
    socket.onmessage = (event) => {
      addMessage(currentChat.id, { sender: "bot", text: event.data });
      setChat((prevChat) => [...prevChat, { sender: "bot", text: event.data }]);
    };
  }, [currentChat, addMessage]);

  const sendMessage = () => {
    if (message.trim()) {
      addMessage(currentChat.id, { sender: "user", text: message });
      setChat((prevChat) => [...prevChat, { sender: "user", text: message }]);
      socket.send(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col flex-grow p-4">
      <div
        className="flex-grow overflow-y-auto mb-4"
        ref={chatContainerRef}
        style={{ maxHeight: "70vh" }}
      >
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded ${
              msg.sender === "user"
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-300 text-black self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <textarea
          ref={inputRef}
          className="flex-grow p-2 border border-gray-300 rounded mr-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
        />
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
