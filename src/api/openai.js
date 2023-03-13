import axios from "axios";

const API_URL = "https://api.openai.com/v1/chat/completions";
const DALLE_API_URL = "https://api.openai.com/v1/images/generations";
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

export const generateImage = async (prompt) => {
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
    return imageUrl;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const sendChatMessage = async (transcript) => {
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
    return message;
  } catch (error) {
    console.log(error);
    return null;
  }
};
