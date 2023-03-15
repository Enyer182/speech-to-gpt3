import React from "react";

export const initialState = {
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
