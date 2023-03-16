import React, { useContext, useEffect } from "react";
import MicIcon from "@mui/icons-material/Mic";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { AppContext } from "./AppContext";
import CircularProgress from "@mui/material/CircularProgress";
import { useSpeechRecognition } from "react-speech-kit";

const ChatFooter = ({ handleSubmit }) => {
  const { dispatch, state } = useContext(AppContext);

  const { listen, stop } = useSpeechRecognition({
    onResult: (result) => {
      dispatch({ type: "SET_TRANSCRIPT", payload: result });
    },
  });
  const onSubmit = (e) => {
    handleSubmit(e);
    dispatch({ type: "SET_IS_LOADING", payload: true });
  };

  const startRecording = async () => {
    dispatch({ type: "SET_IS_RECORDING", payload: true });
    listen();
  };

  const stopRecording = () => {
    dispatch({ type: "SET_IS_RECORDING", payload: false });
    stop();
  };

  const handleStop = () => {
    dispatch({ type: "TOGGLE_VOICE_ASSISTANT_ACTIVE" });
    if (state.voiceAssistantActive) {
      speechSynthesis.pause();
    } else {
      speechSynthesis.resume();
    }
  };
  useEffect(() => {
    console.log("voiceAssistantActive:", state.voiceAssistantActive);
  }, [state.voiceAssistantActive]);

  // ... other code

  return (
    <div className="chat-footer">
      {state.isLoading && <CircularProgress />}
      <form onSubmit={onSubmit}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* message input */}
          <textarea
            value={state.transcript}
            onChange={(e) =>
              dispatch({ type: "SET_TRANSCRIPT", payload: e.target.value })
            }
            type="text"
            placeholder="Type your message here"
            className="input-text-area"
            style={{
              height: "50%",
              resize: "none",
              width: "60%",
              marginRight: "px",
            }}
            disabled={state.isSendingMessage || state.isTypingComplete}
          />
          {/* send button */}
          <button
            disabled={state.isSendingMessage || state.isTypingComplete}
            type="submit"
            style={{ marginLeft: "20px" }}
          >
            {state.isSendingMessage || state.isTypingComplete ? "..." : "Send"}
          </button>
          {/* voice assistant icons */}
          <div className="voice-assistant">
            {state.isRecording ? (
              <GraphicEqIcon
                className="record-icon"
                style={{ fontSize: "50px" }}
                onClick={stopRecording}
              />
            ) : (
              <MicIcon style={{ fontSize: "50px" }} onClick={startRecording} />
            )}
            {state.voiceAssistantActive ? (
              <RecordVoiceOverIcon
                className="stop"
                style={{ fontSize: "50px" }}
                onClick={handleStop}
              />
            ) : (
              <StopCircleIcon
                style={{ fontSize: "50px" }}
                onClick={handleStop}
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatFooter;
