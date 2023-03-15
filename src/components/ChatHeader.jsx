import React, { useContext } from "react";
import { AppContext } from "./AppContext";

const ChatHeader = () => {
  const { state } = useContext(AppContext);

  return (
    <div className="chat-header">
      <h1>Chat with ChatGPT</h1>
    </div>
  );
};

export default ChatHeader;
