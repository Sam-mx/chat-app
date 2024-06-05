import React from "react";

const ChatItem = ({ chat, selectChat }) => {
  return (
    <div
      className="p-2 border-b cursor-pointer hover:bg-gray-200"
      onClick={() => selectChat(chat)}
    >
      <p>{chat.name}</p>
    </div>
  );
};

export default ChatItem;
