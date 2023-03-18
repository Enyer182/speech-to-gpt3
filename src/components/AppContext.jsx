import React from "react";

export const initialState = {
  isLoading: false,
  isRecording: false,
  transcript: "",
  response: "",
  messages: [],
  isSending: false,
  isSendingMessage: false,
  generatedImageUrl: null,
  voiceAssistantActive: true,
  isTypingComplete: false,
  isChatbotTyping: false,
  isSpeechPaused: false,
};

export const AppContext = React.createContext(initialState);
