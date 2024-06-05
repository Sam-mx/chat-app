import Chat from "./components/Chat";
import ChatItem from "./components/ChatItem";
import SideList from "./components/SideList";
import Navbar from "./components/Navbar";
import { useState } from "react";

function App() {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

  const addMessage = (chatId, message) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId
          ? { ...chat, messages: [...chat.messages, message] }
          : chat
      )
    );
  };

  const selectChat = (chat) => {
    if (!chat) {
      const newChat = {
        id: Date.now(),
        name: `Chat ${chats.length + 1}`,
        messages: [],
      };
      setChats((prevChats) => [newChat, ...prevChats]);
      setCurrentChat(newChat);
    } else {
      setCurrentChat(chat);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow">
        <SideList chats={chats} selectChat={selectChat} />
        {currentChat && (
          <div className="flex-grow">
            <Chat currentChat={currentChat} addMessage={addMessage} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
