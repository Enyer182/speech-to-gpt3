import React, { useState, useEffect, useRef } from "react";
import { useSpeechRecognition } from "react-speech-kit";
import axios from "axios";
import MicIcon from "@mui/icons-material/Mic";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import Typing from "./Typing";
import StopCircleIcon from "@mui/icons-material/StopCircle";

const API_URL = "https://api.openai.com/v1/chat/completions";
const DALLE_API_URL = "https://api.openai.com/v1/images/generations";
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

const Recorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [messages, setMessages] = useState([]);
  const chatBodyRef = useRef(null);
  const [typing, setTyping] = useState([]);
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
  const [isSending, setIsSendingMessage] = useState(false);
  const [isChatbotTyping, setIsChatbotTyping] = useState(false);

  const { listen, stop } = useSpeechRecognition({
    onResult: (result) => {
      setTranscript(result);
    },
  });

  const generateImage = async (prompt) => {
    const data = {
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    };
    try {
      const response = await axios.post(DALLE_API_URL, data, {
        headers: headers,
      });
      const imageUrl = response.data.data[0].url;
      setIsSendingMessage(false);
      return imageUrl;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (transcript === "") return;
    setTranscript("");
    const newMessage = { from: "user", content: transcript };
    setMessages([...messages, newMessage]);
    setIsSendingMessage(true);

    if (transcript.includes("generate an image:")) {
      // TODO: right now the input for the image generation gets replaced with the image
      const remainingTranscript = transcript.replace("generate an image", "");
      const imageUrl = await generateImage(remainingTranscript);
      if (imageUrl) {
        const newImageMessage = {
          from: "chatgpt",
          content: "Here's your generated image",
          imageUrl: imageUrl,
        };
        setMessages([...messages, newImageMessage]);
        setGeneratedImageUrl(imageUrl);
        setIsSendingMessage(false);
      }
    } else {
      const params = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "assistant", content: transcript }],
      };
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      };
      try {
        const response = await axios.post(API_URL, params, { headers });
        const message = response.data.choices[0].message.content.trim();
        setResponse(message);
        // Split the response message into an array of sentences
        const sentences = message.split(". ");
        const trimmedSentences = sentences.map((sentence) => sentence.trim());

        // Simulate typing effect by updating the current sentence being typed out
        setIsChatbotTyping(true);
        let currentIndex = 0;
        const intervalId = setInterval(() => {
          setTyping(trimmedSentences.slice(0, currentIndex + 1));
          currentIndex++;
          if (currentIndex >= trimmedSentences.length) {
            clearInterval(intervalId);
            setIsChatbotTyping(false);
            setIsSendingMessage(false);
          }
        }, 2000);

        const utterance = new SpeechSynthesisUtterance(message);
        utterance.lang = "en-US";
        speechSynthesis.speak(utterance);

        const newMessages = [
          ...messages,
          newMessage,
          { from: "chatgpt", content: message },
        ];
        setMessages(newMessages);
        setGeneratedImageUrl(null);
        setTranscript("");
      } catch (error) {
        console.log(error);
      } finally {
        setIsSendingMessage(false);
      }
    }
  };
  const handleStop = () => {
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

  const handleScroll = (scrollHeight, clientHeight) => {
    let timeoutId;
    const trimmedSentences = typing.slice().reverse();
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      setTyping(trimmedSentences.slice(0, currentIndex + 1).reverse());
      currentIndex++;
      if (currentIndex >= trimmedSentences.length) {
        // Ensure that the scrollTop value is never greater than the scrollHeight
        const newScrollTop = Math.max(scrollHeight - clientHeight, 0);
        chatBodyRef.current.scrollTo({
          top: newScrollTop,
          behavior: "smooth",
        });
        clearInterval(intervalId);
      }
    }, 1500); // adjust the interval time as needed
    timeoutId = intervalId;
    return () => clearTimeout(timeoutId);
  };

  const interceptScroll = () => {
    if (chatBodyRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatBodyRef.current;
      // Always scroll to the bottom if typing is false or if user is at the bottom of the chat or very close to it
      if (!typing || scrollTop + clientHeight >= scrollHeight - 50) {
        chatBodyRef.current.scrollTo({
          top: chatBodyRef.current.scrollHeight,
          behavior: "smooth",
        });
      } else {
        // If the user is not at the bottom and typing is true, delay the scroll until the typing is finished
        handleScroll(scrollHeight, clientHeight);
      }
    }
  };

  useEffect(() => {
    interceptScroll();
  }, [typing, messages, isSending, isChatbotTyping]);

  return (
    <div>
      <div className="chat-layout">
        <div className="chat-header">
          <h1>Chat with ChatGPT</h1>
        </div>
        <div className="chat-body" ref={chatBodyRef}>
          {messages.map((message, index) => (
            <div key={index} className={`chat-message from-${message.from}`}>
              <div className="message-content">
                {/* If the message is from the assistant */}
                {message.from === "chatgpt" ? (
                  <>
                    {/* If the message is an image message */}
                    {message.imageUrl ? (
                      <div className="image-message">
                        <img
                          src={message.imageUrl}
                          alt="Generated by DALLE API"
                          style={{ width: "100%", height: "auto" }}
                        />
                        <p>{message.content}</p>
                      </div>
                    ) : (
                      // Otherwise, display the text
                      <Typing message={message.content} />
                    )}
                  </>
                ) : (
                  // If the message is from the user, display the text
                  <p>{message.content}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="chat-footer">
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
              onChange={(e) => setTranscript(e.target.value)}
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
              {isRecording ? (
                <GraphicEqIcon
                  className="record-icon"
                  style={{ fontSize: "50px" }}
                  onClick={stopRecording}
                />
              ) : (
                <MicIcon
                  style={{ fontSize: "50px" }}
                  onClick={startRecording}
                />
              )}
              {/* Buttons to stop recording and speech synthesis */}
              <StopCircleIcon
                className="stop"
                style={{ marginLeft: "5px", fontSize: "50px" }}
                onClick={handleStop}
              />
              <span>turn off voice assistant</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Recorder;
