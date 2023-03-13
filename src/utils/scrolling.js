export const handleScroll = (
  chatBodyRef,
  scrollHeight,
  clientHeight,
  typing,
  setTyping
) => {
  let timeoutId;
  const trimmedSentences = typing.slice().reverse();
  let currentIndex = 0;
  const intervalId = setInterval(() => {
    setTyping(trimmedSentences.slice(0, currentIndex + 1).reverse());
    currentIndex++;
    if (currentIndex >= trimmedSentences.length) {
      // Ensure that the scrollTop value is never greater than the scrollHeight
      const newScrollTop = Math.max(scrollHeight - clientHeight, 0);
      chatBodyRef.current.scrollTo({
        top: newScrollTop,
        behavior: "smooth",
      });
      clearInterval(intervalId);
    }
  }, 1500); // adjust the interval time as needed
  timeoutId = intervalId;
  return () => clearTimeout(timeoutId);
};

export const interceptScroll = (
  chatBodyRef,
  typing,
  messages,
  isSending,
  isChatbotTyping,
  setTyping
) => {
  if (chatBodyRef.current) {
    const { scrollTop, scrollHeight, clientHeight } = chatBodyRef.current;
    // Always scroll to the bottom if typing is false or if user is at the bottom of the chat or very close to it
    if (!typing || scrollTop + clientHeight >= scrollHeight - 50) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    } else {
      // If the user is not at the bottom and typing is true, delay the scroll until the typing is finished
      handleScroll(chatBodyRef, scrollHeight, clientHeight, typing, setTyping);
    }
  }
};
