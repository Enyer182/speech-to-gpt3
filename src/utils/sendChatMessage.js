import { debouncedSendChatMessage } from "../api/openai";

export const getChatbotResponse = async (
  transcript,
  voiceAssistantActive,
  isSpeechPaused
) => {
  const message = await debouncedSendChatMessage(transcript);
  if (message) {
    const sentences = message.split(". ");
    const trimmedSentences = sentences.map((sentence) => sentence.trim());
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = "en-US";
    if (voiceAssistantActive && !isSpeechPaused) {
      speechSynthesis.speak(utterance);
    }
    return {
      message: message,
      trimmedSentences: trimmedSentences,
    };
  }
  return {};
};
