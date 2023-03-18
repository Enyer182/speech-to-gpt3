import { generateImageMessage } from "../utils/generateImage";
import { getChatbotResponse } from "../utils/sendChatMessage";

const GENERATE_IMAGE_COMMAND = "generate an image:";

const messageHandler = async (
  transcript,
  messages,
  setMessages,
  setIsTypingComplete,
  setIsSendingMessage,
  setGeneratedImageUrl,
  setResponse,
  setTranscript,
  voiceAssistantActive
) => {
  if (transcript === "") return;
  setTranscript("");
  const newMessage = { from: "user", content: transcript };
  setMessages([...messages, newMessage]);
  setIsSendingMessage(true);

  try {
    if (transcript.includes(GENERATE_IMAGE_COMMAND)) {
      const newImageMessage = await generateImageMessage(transcript);
      if (newImageMessage) {
        // setIsSendingMessage(false);
        setMessages([...messages, newImageMessage]);
        setGeneratedImageUrl(newImageMessage.imageUrl);
      }
    } else {
      const { message, trimmedSentences } = await getChatbotResponse(
        transcript,
        voiceAssistantActive
      );
      if (message) {
        setResponse(message);
        let currentIndex = 0;
        const intervalId = setInterval(() => {
          setIsTypingComplete(
            trimmedSentences.slice(0, currentIndex + 1).reverse()
          );
          currentIndex++;
          if (currentIndex >= trimmedSentences.length) {
            clearInterval(intervalId);
            // setIsSendingMessage(false);
          }
        });
        const newMessages = [
          ...messages,
          newMessage,
          { from: "chatgpt", content: message },
        ];
        setMessages(newMessages);
        setTranscript("");
        setGeneratedImageUrl(null);
      }
    }
  } catch (error) {
    console.log(error);
    setIsSendingMessage(false);
  }
};

export default messageHandler;
