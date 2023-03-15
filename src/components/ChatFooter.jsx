import React, { useContext } from "react";
import MicIcon from "@mui/icons-material/Mic";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import { AppContext } from "./AppContext";

const ChatFooter = ({
  isRecording,
  transcript,
  startRecording,
  stopRecording,
  isSending,
  handleStop,
  isTypingComplete,
  handleSubmit,
}) => {
  const { dispatch, state } = useContext(AppContext);

  const onSubmit = (e) => {
    handleSubmit(e);
    dispatch({ type: "SET_IS_LOADING", payload: true });
  };

  return (
    <div className="chat-footer">
      {state.isLoading && <div className="loading-spinner"></div>}
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
            value={transcript}
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
            disabled={isSending || isTypingComplete}
          />
          {/* send button */}
          <button
            disabled={isSending || isTypingComplete}
            type="submit"
            style={{ marginLeft: "20px" }}
          >
            {isTypingComplete || isSending ? "..." : "Send"}
          </button>
          {/* voice assistant icons */}
          <div className="voice-assistant">
            {isRecording ? (
              <GraphicEqIcon
                className="record-icon"
                style={{ fontSize: "50px" }}
                onClick={stopRecording}
              />
            ) : (
              <MicIcon style={{ fontSize: "50px" }} onClick={startRecording} />
            )}

            <RecordVoiceOverIcon
              className="stop"
              style={{ fontSize: "50px" }}
              onClick={handleStop}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatFooter;
