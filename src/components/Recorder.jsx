import React, { useState, useEffect, useRef } from "react";
import { useSpeechRecognition } from "react-speech-kit";
import { interceptScroll } from "../utils/scrolling";
import messageHandler from "../utils/messageHandler";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatFooter from "./ChatFooter";
import Typing from "./Typing";

const Recorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [messages, setMessages] = useState([]);
  const chatBodyRef = useRef(null);
  const [typing, setTyping] = useState("");
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
  const [isSending, setIsSendingMessage] = useState(false);
  const [voiceAssistantActive, setVoiceAssistantActive] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

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
      setIsTypingComplete,
      setTyping,
      setIsSendingMessage,
      setGeneratedImageUrl,
      setResponse,
      setTranscript
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
    interceptScroll(chatBodyRef, typing, messages, isSending, setTyping);
  }, [typing, messages, isSending, chatBodyRef, setTyping]);
  return (
    <div>
      <div className="chat-layout">
        <ChatHeader />
        <div className="chat-body" ref={chatBodyRef}>
          {messages.map((message, index) => (
            <ChatMessage
              setIsSendingMessage={setIsSendingMessage}
              setIsChatbotTyping={setIsTypingComplete}
              key={index}
              message={message}
            />
          ))}
        </div>
        <div>
          <ChatFooter
            isRecording={isRecording}
            transcript={transcript}
            startRecording={startRecording}
            stopRecording={stopRecording}
            handleStop={handleStop}
            isSending={isSending}
            isChatbotTyping={isTypingComplete}
            handleSubmit={handleSubmit}
            setTranscript={setTranscript}
            voiceAssistantActive={voiceAssistantActive}
            isTypingComplete={isTypingComplete}
          />
        </div>
      </div>
    </div>
  );
};

export default Recorder;
