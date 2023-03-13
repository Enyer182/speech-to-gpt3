import React, { useRef } from "react";
import ChatMessage from "./ChatMessage";
import useChatScroll from "../utils/useChatScroll";

const ChatBody = ({
  messages,
  typing,
  isSending,
  generatedImageUrl,
  isChatbotTyping,
}) => {
  const shouldScroll = useRef(true);
  const chatBodyRef = useChatScroll(shouldScroll);

  const renderMessages = () => {
    return messages.map((message, index) => (
      <ChatMessage
        key={index}
        message={message}
        isLastMessage={index === messages.length - 1}
      />
    ));
  };

  const renderTypingIndicator = () => {
    if (typing.length > 0) {
      return (
        <div className="chat-message chat-message--typing">
          <div className="chat-message__content">
            {typing.map((sentence, index) => (
              <span key={index}>
                {sentence}
                {index === typing.length - 1 ? "" : " "}
              </span>
            ))}
            <span className="chat-message__dot-1">.</span>
            <span className="chat-message__dot-2">.</span>
            <span className="chat-message__dot-3">.</span>
          </div>
        </div>
      );
    }
  };

  const renderSendingIndicator = () => {
    if (isSending) {
      return (
        <div className="chat-message chat-message--sending">
          <div className="chat-message__content">
            <span>Sending...</span>
          </div>
        </div>
      );
    }
  };

  const renderImage = () => {
    if (generatedImageUrl) {
      return (
        <div className="chat-message chat-message--image">
          <div className="chat-message__content">
            <img src={generatedImageUrl} alt="Generated" />
          </div>
        </div>
      );
    }
  };

  const renderChatbotTypingIndicator = () => {
    if (isChatbotTyping) {
      return (
        <div className="chat-message chat-message--chatbot-typing">
          <div className="chat-message__content">
            <span>ChatGPT is typing...</span>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="chat-body" ref={chatBodyRef}>
      {renderMessages()}
      {renderTypingIndicator()}
      {renderSendingIndicator()}
      {renderImage()}
      {renderChatbotTypingIndicator()}
    </div>
  );
};

export default ChatBody;
