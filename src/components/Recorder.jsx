import React, { useRef, useContext, useEffect, useCallback } from "react";
import { interceptScroll } from "../utils/scrolling";
import messageHandler from "../utils/messageHandler";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatFooter from "./ChatFooter";
import { AppContext } from "./AppContext";

const Recorder = () => {
  const { state, dispatch } = useContext(AppContext);
  const chatBodyRef = useRef(null);

  const setMessagesCallback = (messages) => {
    dispatch({ type: "SET_MESSAGES", payload: messages });
  };

  const setIsTypingCompleteCallback = useCallback(
    (isTypingComplete) => {
      dispatch({ type: "SET_IS_TYPING_COMPLETE", payload: isTypingComplete });
    },
    [dispatch]
  );

  const setIsGeneratingImageCallback = (isGeneratingImage) => {
    dispatch({ type: "SET_IS_GENERATING_IMAGE", payload: isGeneratingImage });
  };

  const setResponseCallback = (response) => {
    dispatch({ type: "SET_RESPONSE", payload: response });
  };

  const setTranscriptCallback = (transcript) => {
    dispatch({ type: "SET_TRANSCRIPT", payload: transcript });
  };

  const setIsSendingMessageCallback = (isSendingMessage) => {
    dispatch({ type: "SET_IS_SENDING_MESSAGE", payload: isSendingMessage });
  };

  const setErrorCallback = (error) => {
    dispatch({ type: "SET_ERROR", payload: error });
  };

  const setLoadingCallback = (isLoading) => {
    dispatch({ type: "SET_IS_LOADING", payload: isLoading });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await messageHandler(
        state.transcript,
        state.messages,
        setMessagesCallback,
        setIsSendingMessageCallback,
        setIsTypingCompleteCallback,
        setIsGeneratingImageCallback,
        setResponseCallback,
        setTranscriptCallback,
        state.voiceAssistantActive,
        setErrorCallback
      );
    } catch (error) {
      setErrorCallback("some other error has hapenned");
    } finally {
      setLoadingCallback(false);
    }
  };

  useEffect(() => {
    interceptScroll(
      chatBodyRef,
      state.typing,
      state.messages,
      state.isSending,
      state.isChatbotTyping,
      state.isTypingComplete,
      setIsTypingCompleteCallback,
      state.transcript
    );
  }, [
    dispatch,
    state.typing,
    state.messages,
    state.isSending,
    chatBodyRef,
    state.isChatbotTyping,
    state.isTypingComplete,
    state.isSendingMessage,
    setIsTypingCompleteCallback,
    state.transcript,
  ]);
  return (
    <div>
      <div className="chat-layout">
        <ChatHeader />
        <div className="chat-body" ref={chatBodyRef}>
          {state.error && <div className="error">{state.error}</div>}
          {state.messages.map((message, index) => (
            <ChatMessage
              setIsSendingMessage={setIsSendingMessageCallback}
              setIsChatbotTyping={setIsTypingCompleteCallback}
              key={index}
              message={message}
            />
          ))}
        </div>
        <div>
          <ChatFooter handleSubmit={handleSubmit} />
        </div>
      </div>
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        Made with ❤️ by Enyer
      </div>
    </div>
  );
};

export default Recorder;
