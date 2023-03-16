export const { listen, stop } = useSpeechRecognition({
  onResult: (result) => {
    dispatch({ type: "SET_TRANSCRIPT", payload: result });
  },
});
