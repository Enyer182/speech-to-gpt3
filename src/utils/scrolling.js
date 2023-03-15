export const handleScroll = (
  scrollHeight,
  clientHeight,
  typing,
  setTyping,
  chatBodyRef
) => {
  const trimmedSentences = typing.slice().reverse();
  let currentIndex = 0;
  const intervalId = setInterval(() => {
    setTyping(trimmedSentences.slice(0, currentIndex + 1).reverse());
    currentIndex++;
    if (currentIndex >= trimmedSentences.length) {
      clearInterval(intervalId);
    }
  }, 1500);

  const newScrollTop = Math.max(scrollHeight - clientHeight, 0);
  setTimeout(() => {
    setTyping("");
    chatBodyRef.current.scrollTo({
      top: newScrollTop,
      behavior: "smooth",
    });
  }, trimmedSentences.length * 1500);
};

export const interceptScroll = (
  chatBodyRef,
  typing,
  messages,
  isSending,
  isChatbotTyping,
  setTyping
) => {
  const { scrollTop, scrollHeight, clientHeight } = chatBodyRef.current;

  // Always scroll to the bottom if user is at the bottom of the chat or very close to it
  if (!typing && scrollTop + clientHeight >= scrollHeight - 20) {
    chatBodyRef.current.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  } else if (typing && !isSending && !isChatbotTyping) {
    // If the user is typing and is not currently sending or waiting for a response, delay the scroll until typing is finished
    handleScroll(scrollHeight, clientHeight, typing, setTyping, chatBodyRef);
  } else if (!isChatbotTyping) {
    // If the user is not typing and the chatbot is not currently typing, scroll to the bottom
    chatBodyRef.current.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }
};
