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

  const voiceAssistantActiveCallback = (voiceAssistantActive) => {
    dispatch({
      type: "SET_VOICE_ASSISTANT_ACTIVE",
      payload: voiceAssistantActive,
    });
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
        voiceAssistantActiveCallback
      );
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: null });
      setErrorCallback(error);
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
        {state.error && <div className="error">{state.error.message}</div>}
        <div className="chat-body" ref={chatBodyRef}>
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
    </div>
  );
};

export default Recorder;
