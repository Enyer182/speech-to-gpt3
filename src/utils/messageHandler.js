import { generateImageMessage } from "../utils/generateImage";
import { getChatbotResponse } from "../utils/sendChatMessage";

const GENERATE_IMAGE_COMMAND = "generate an image:";

const messageHandler = async (
  transcript,
  messages,
  setMessages,
  setIsChatbotTyping,
  setTyping,
  setIsSendingMessage,
  setGeneratedImageUrl,
  setResponse,
  setTranscript
) => {
  if (transcript === "") return;
  setTranscript("");
  const newMessage = { from: "user", content: transcript };
  setMessages([...messages, newMessage]);
  setIsSendingMessage(true);

  try {
    setIsChatbotTyping(true);
    if (transcript.includes(GENERATE_IMAGE_COMMAND)) {
      const newImageMessage = await generateImageMessage(transcript);
      if (newImageMessage) {
        setMessages([...messages, newImageMessage]);
        setGeneratedImageUrl(newImageMessage.imageUrl);
      }
    } else {
      const { message, trimmedSentences } = await getChatbotResponse(
        transcript
      );
      if (message) {
        setResponse(message);
        let currentIndex = 0;
        const intervalId = setInterval(() => {
          setTyping(trimmedSentences.slice(0, currentIndex + 1).reverse());
          currentIndex++;
          if (currentIndex >= trimmedSentences.length) {
            clearInterval(intervalId);
            setIsChatbotTyping(false);
            setIsSendingMessage(false);
          }
        });
        const newMessages = [
          ...messages,
          newMessage,
          { from: "chatgpt", content: message },
        ];
        setMessages(newMessages);
        setGeneratedImageUrl(null);
        setTranscript("");
      }
    }
    setIsChatbotTyping(false); // moved outside the if-else statement
    setIsSendingMessage(false);
  } catch (error) {
    console.log(error);
    setIsSendingMessage(false);
  }
};

export default messageHandler;
