import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useGensen from "./hooks/useGensen";
import { useEffect } from "react";

const App = () => {
  const { script, tokens, setScript } = useGensen();

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    browserSupportsContinuousListening,
  } = useSpeechRecognition();

  useEffect(() => setScript(transcript), [transcript, setScript]);

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
      <textarea onChange={(e) => setScript(e.target.value)} />
      <div>
        {tokens.map((token, index) => (
          <span
            className={token.term === null ? "normal-text" : "term-text"}
            key={token.string + index}
            onClick={() => {
              if (token.term === null) return;
              const prompt = `医師に「${script}」と説明を受けましたが「${token.term}」の意味がわかりません。わかりやすく説明してください`;
              const gpt_url = `https://chat.openai.com/?q=${prompt}`;
              open(gpt_url);
            }}
          >
            {token.string}
          </span>
        ))}
      </div>
    </div>
  );
};

export default App;
