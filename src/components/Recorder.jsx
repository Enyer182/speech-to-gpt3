import React, { useState, useEffect, useRef } from "react";
import { useSpeechRecognition } from "react-speech-kit";
import { interceptScroll } from "../utils/scrolling";
import messageHandler from "../utils/messageHandler";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatFooter from "./ChatFooter";

const Recorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [messages, setMessages] = useState([]);
  const chatBodyRef = useRef(null);
  const [typing, setTyping] = useState("");
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
  const [isSending, setIsSendingMessage] = useState(false);
  const [isChatbotTyping, setIsChatbotTyping] = useState(false);
  const [voiceAssistantActive, setVoiceAssistantActive] = useState(true);

  const { listen, stop } = useSpeechRecognition({
    onResult: (result) => {
      setTranscript(result);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await messageHandler(
      transcript,
      messages,
      setMessages,
      setTyping,
      setIsSendingMessage,
      setIsChatbotTyping,
      setGeneratedImageUrl,
      setResponse,
      setTranscript,
      isSending,
      isChatbotTyping,
      generatedImageUrl
    );
  };

  const handleStop = () => {
    voiceAssistantActive
      ? setVoiceAssistantActive(false)
      : setVoiceAssistantActive(true);
    speechSynthesis.cancel();
  };

  const startRecording = async () => {
    setIsRecording(true);
    listen();
  };

  const stopRecording = () => {
    setIsRecording(false);
    stop();
  };

  useEffect(() => {
    interceptScroll(
      chatBodyRef,
      typing,
      messages,
      isSending,
      isChatbotTyping,
      setTyping,
      setMessages,
      setIsSendingMessage,
      setIsChatbotTyping
    );
  }, [
    typing,
    messages,
    isSending,
    isChatbotTyping,
    chatBodyRef,
    setTyping,
    setMessages,
    setIsSendingMessage,
  ]);
  return (
    <div>
      <div className="chat-layout">
        <ChatHeader />
        <div className="chat-body" ref={chatBodyRef}>
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>
        <ChatFooter
          isRecording={isRecording}
          transcript={transcript}
          startRecording={startRecording}
          stopRecording={stopRecording}
          handleStop={handleStop}
          isSending={isSending}
          isChatbotTyping={isChatbotTyping}
          handleSubmit={handleSubmit}
          setTranscript={setTranscript}
          voiceAssistantActive={voiceAssistantActive}
        />
      </div>
    </div>
  );
};

export default Recorder;
