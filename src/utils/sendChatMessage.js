import { debouncedSendChatMessage } from "../api/openai";

export const getChatbotResponse = async (transcript, voiceAssistantActive) => {
  const message = await debouncedSendChatMessage(transcript);
  if (message) {
    const sentences = message.split(". ");
    const trimmedSentences = sentences.map((sentence) => sentence.trim());
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = "en-US";
    if (voiceAssistantActive) {
      speechSynthesis.speak(utterance);
    }
    return {
      message: message,
      trimmedSentences: trimmedSentences,
    };
  }
  return {};
};
