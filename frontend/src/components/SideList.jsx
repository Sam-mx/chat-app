import React from "react";
import ChatItem from "./ChatItem";
import { useState } from "react";

const SideList = ({ chats, selectChat }) => {
  return (
    <div className="w-full sm:w-1/3 md:w-1/4 lg:w-1/5 h-full bg-gray-100 p-4 border-r overflow-y-auto">
      <div className="mb-4">
        <button
          className="w-full bg-blue-500 text-white p-2 rounded"
          onClick={() => selectChat(null)}
        >
          New Chat
        </button>
      </div>
      {chats.map((chat, index) => (
        <ChatItem key={index} chat={chat} selectChat={selectChat} />
      ))}
    </div>
  );
};

export default SideList;
