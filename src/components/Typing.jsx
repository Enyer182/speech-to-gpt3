import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "./AppContext";

const Typing = ({ message }) => {
  const { dispatch } = useContext(AppContext);
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const TYPING_DELAY = 10;

  useEffect(() => {
    if (index === 0) {
      dispatch({ type: "SET_IS_TYPING", payload: true });
    }

    if (index === message.length) {
      setIsTypingComplete(true);
      dispatch({ type: "SET_IS_TYPING", payload: false });
      return;
    }
    const intervalId = setInterval(() => {
      setText((prevText) => {
        const currentChar = message[index];
        const nextIndex = index + 1;
        setIndex(nextIndex);
        return prevText + currentChar;
      });
    }, TYPING_DELAY);
    return () => clearInterval(intervalId);
  }, [index, message, dispatch]);

  return <p>{text}</p>;
};

export default Typing;
