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
    <>
      <div style={{ position: "fixed", top: 0, width: "100%" }}>
        <h1 style={{ textAlign: "center" }}>Clarimed</h1>
      </div>
      <div style={{ fontSize: "3em", margin: 36 }}>
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
      <div
        style={{ position: "fixed", width: "100%", bottom: 0, display: "flex" }}
      >
        <button
          style={{
            padding: 24,
            border: "none",
            borderRadius: "50%",
            backgroundColor: "pink",
            margin: "0 auto 16px auto",
          }}
          onClick={() => {
            if (listening) {
              SpeechRecognition.stopListening();
            } else {
              if (browserSupportsContinuousListening) {
                SpeechRecognition.startListening({
                  language: "ja",
                  continuous: true,
                });
              } else {
                alert("継続リスニングに対応していません");
              }
            }
          }}
        >
          <img
            src={
              listening
                ? "src/assets/pause.svg"
                : "src/assets/microphone-342.svg"
            }
            style={{ width: 52 }}
          />
        </button>
      </div>
    </>
  );
};

export default App;
