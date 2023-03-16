import React from "react";

export const initialState = {
  isLoading: false,
  isRecording: false,
  transcript: "",
  response: "",
  messages: [],
  isSending: [],
  isSendingMessage: false,
  generatedImageUrl: null,
  voiceAssistantActive: true,
  isTypingComplete: false,
  typing: "",
};

export const AppContext = React.createContext(initialState);
