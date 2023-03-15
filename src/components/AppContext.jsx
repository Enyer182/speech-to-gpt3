import React from "react";

export const initialState = {
  isLoading: false,
  isRecording: false,
  transcript: "",
  response: "",
  messages: [],
  generatedImageUrl: null,
  isSending: false,
  voiceAssistantActive: true,
  isTypingComplete: false,
};

export const AppContext = React.createContext(initialState);
