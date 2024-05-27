import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const App = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    browserSupportsContinuousListening,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p>Microphone: {listening ? "on" : "off"}</p>
      <button
        onClick={() => {
          if (browserSupportsContinuousListening) {
            SpeechRecognition.startListening({
              language: "ja",
              continuous: true,
            });
          } else {
            alert("継続リスニングに対応していません");
          }
        }}
      >
        Start
      </button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
};

export default App;
