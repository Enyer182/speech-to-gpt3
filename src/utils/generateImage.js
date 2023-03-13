import { generateImage } from "../api/openai";

export const generateImageMessage = async (transcript) => {
  const remainingTranscript = transcript.replace("generate an image", "");
  const imageUrl = await generateImage(remainingTranscript);
  if (imageUrl) {
    return {
      from: "chatgpt",
      content: "Here's your generated image",
      imageUrl: imageUrl,
    };
  }
};
