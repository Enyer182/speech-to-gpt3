import React, { useRef, useContext, useEffect } from "react";
import { useSpeechRecognition } from "react-speech-kit";
import { interceptScroll } from "../utils/scrolling";
import messageHandler from "../utils/messageHandler";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatFooter from "./ChatFooter";
import { AppContext } from "./AppContext";

const Recorder = () => {
  const { state, dispatch } = useContext(AppContext);
  const chatBodyRef = useRef(null);
  const { listen, stop } = useSpeechRecognition({
    onResult: (result) => {
      dispatch({ type: "SET_TRANSCRIPT", payload: result });
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "SET_ERROR", payload: null });
    try {
      await messageHandler(
        state.transcript,
        state.messages,
        (messages) => dispatch({ type: "SET_MESSAGES", payload: messages }),
        () => dispatch({ type: "SET_IS_TYPING_COMPLETE", payload: true }),
        (typing) => dispatch({ type: "SET_TYPING", payload: typing }),
        (isSending) =>
          dispatch({ type: "SET_IS_SENDING_MESSAGE", payload: isSending }),
        (generatedImageUrl) =>
          dispatch({
            type: "SET_GENERATED_IMAGE_URL",
            payload: generatedImageUrl,
          }),
        (response) => dispatch({ type: "SET_RESPONSE", payload: response }),
        () => dispatch({ type: "SET_TRANSCRIPT", payload: "" })
      );
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error });
    } finally {
      dispatch({ type: "SET_IS_LOADING", payload: false });
    }
  };

  const handleStop = () => {
    dispatch({
      type: "SET_VOICE_ASSISTANT_ACTIVE",
      payload: !state.voiceAssistantActive,
    });
    speechSynthesis.cancel();
  };

  const startRecording = async () => {
    dispatch({ type: "SET_IS_RECORDING", payload: true });
    listen();
  };

  const stopRecording = () => {
    dispatch({ type: "SET_IS_RECORDING", payload: false });
    stop();
  };

  useEffect(() => {
    interceptScroll(
      chatBodyRef,
      state.typing,
      state.messages,
      state.isSending,
      state.isChatbotTyping,
      (typing) => dispatch({ type: "SET_TYPING", payload: typing })
    );
  }, [
    dispatch,
    state.typing,
    state.messages,
    state.isSending,
    chatBodyRef,
    state.isChatbotTyping,
  ]);
  return (
    <div>
      <div className="chat-layout">
        <ChatHeader />
        {state.error && <div className="error">{state.error.message}</div>}
        <div className="chat-body" ref={chatBodyRef}>
          {state.messages.map((message, index) => (
            <ChatMessage
              setIsSendingMessage={(isSending) =>
                dispatch({ type: "SET_IS_SENDING_MESSAGE", payload: isSending })
              }
              setIsChatbotTyping={(isTypingComplete) =>
                dispatch({
                  type: "SET_IS_TYPING_COMPLETE",
                  payload: isTypingComplete,
                })
              }
              key={index}
              message={message}
            />
          ))}
        </div>
        <div>
          <ChatFooter
            isRecording={state.isRecording}
            transcript={state.transcript}
            startRecording={startRecording}
            stopRecording={stopRecording}
            handleStop={handleStop}
            isSending={state.isSending}
            isChatbotTyping={state.isTypingComplete}
            handleSubmit={handleSubmit}
            setTranscript={(transcript) =>
              dispatch({ type: "SET_TRANSCRIPT", payload: transcript })
            }
            voiceAssistantActive={state.voiceAssistantActive}
            isTypingComplete={state.isTypingComplete}
            generatedImageUrl={state.generatedImageUrl}
          />
        </div>
      </div>
    </div>
  );
};

export default Recorder;
