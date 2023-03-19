import React, { useReducer } from "react";
import { initialState, AppContext } from "./AppContext";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_IS_RECORDING":
      return {
        ...state,
        isRecording: action.payload,
      };
    case "SET_TRANSCRIPT":
      return {
        ...state,
        transcript: action.payload,
      };
    case "SET_RESPONSE":
      return {
        ...state,
        response: action.payload,
      };
    case "SET_MESSAGES":
      return {
        ...state,
        messages: action.payload,
      };

    case "SET_GENERATED_IMAGE_URL":
      return {
        ...state,
        generatedImageUrl: action.payload,
      };
    case "SET_IS_SENDING_MESSAGE":
      return {
        ...state,
        isSending: action.payload,
      };
    case "SET_VOICE_ASSISTANT_ACTIVE":
      return {
        ...state,
        voiceAssistantActive: action.payload,
      };

    case "TOGGLE_VOICE_ASSISTANT_ACTIVE":
      return {
        ...state,
        voiceAssistantActive: !state.voiceAssistantActive,
      };

    case "SET_IS_TYPING_COMPLETE":
      return {
        ...state,
        isTypingComplete: action.payload,
      };

    case "SET_IS_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "SET_IS_CHATBOT_TYPING":
      return {
        ...state,
        isChatbotTyping: action.payload,
      };

    default:
      return state;
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
