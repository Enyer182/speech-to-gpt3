import React, { useState, useEffect } from "react";

const Typing = ({ message }) => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index === message.length) {
      return;
    }
    const intervalId = setInterval(() => {
      setText((prevText) => {
        const currentChar = message[index];
        const nextIndex = index + 1;
        setIndex(nextIndex);
        return prevText + currentChar;
      });
    }, 20);
    return () => clearInterval(intervalId);
  }, [index, message]);

  return <p>{text}</p>;
};

export default Typing;
