import { sendChatMessage } from "../api/openai";

export const getChatbotResponse = async (transcript) => {
  const message = await sendChatMessage(transcript);
  if (message) {
    const sentences = message.split(". ");
    const trimmedSentences = sentences.map((sentence) => sentence.trim());
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
    return {
      message: message,
      trimmedSentences: trimmedSentences,
    };
  }
};
