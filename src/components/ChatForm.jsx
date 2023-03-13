import React from "react";

const ChatForm = ({
  handleSubmit,
  isSending,
  isChatbotTyping,
  transcript,
  setTranscript,
}) => {
  const handleInputChange = (event) => {
    setTranscript(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        {/* If recording is in progress, show stop recording button, otherwise show microphone button */}
      </div>
      <textarea
        value={transcript}
        onChange={handleInputChange}
        type="text"
        placeholder="Type your message here"
        className="input-text-area"
        style={{ height: "100%", resize: "none" }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button disabled={isSending || isChatbotTyping} type="submit">
          Send
        </button>
        {/* Buttons to stop recording and speech synthesis */}
      </div>
    </form>
  );
};

export default ChatForm;
