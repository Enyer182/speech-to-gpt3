import React, { useContext } from "react";
import { AppContext } from "./AppContext";

const ChatHeader = () => {
  const { state } = useContext(AppContext);

  return (
    <div className="chat-header">
      <h1>Chat with ChatGPT</h1>
      <p>{state.messages.length} messages</p>
      <p>Chatting with {state.chatPartner}</p>
      <p>
        Voice assistant is {state.voiceAssistantActive ? "active" : "inactive"}
      </p>
    </div>
  );
};

export default ChatHeader;
