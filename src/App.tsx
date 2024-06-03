// import { useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import { cmp_noun_list } from "./gensenweb-kuromojijs";

const kuromojiBuilder = kuromoji.builder({
  dicPath: "../kuromoji/dict",
});

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

  // useEffect(() => {
  //   kuromojiBuilder.build(function (err, tokenizer) {
  //     const tokenized_word = tokenizer.tokenize(transcript);
  //     const cmp_noun_list_val = gensen.cmp_noun_list(tokenized_word);
  //     const frequency = gensen.list2key_value(cmp_noun_list_val);
  //     const score_lr_val = gensen.score_lr(
  //       frequency,
  //       gensen.IGNORE_WORDS,
  //       1,
  //       1
  //     );
  //     const term_importance_val = gensen.term_importance(
  //       frequency,
  //       score_lr_val
  //     );
  //     const score_lt_list = gensen.sort_by_importance(term_importance_val);
  //     let response = "";
  //     for (const data of score_lt_list) {
  //       const word = gensen.modify_agglutinative_lang(data.cmp_noun);
  //       response = response + word + "\t" + data.importance + "\n";
  //     }
  //     console.log(response);
  //   });
  // }, [transcript]);

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
      <button
        onClick={() => {
          kuromojiBuilder.build(function (err, tokenizer) {
            const tokenized_word = tokenizer.tokenize(
              "こんにちは、あなたは尋常性天疱瘡だと思います。"
            );
            console.log(tokenized_word);
            // const cmp_noun_list_val = cmp_noun_list(tokenized_word);
            // const frequency = gensen.list2key_value(cmp_noun_list_val);
            // const score_lr_val = gensen.score_lr(
            //   frequency,
            //   gensen.IGNORE_WORDS,
            //   1,
            //   1
            // );
            // const term_importance_val = gensen.term_importance(
            //   frequency,
            //   score_lr_val
            // );
            // const score_lt_list =
            //   gensen.sort_by_importance(term_importance_val);
            // let response = "";
            // for (const data of score_lt_list) {
            //   const word = gensen.modify_agglutinative_lang(data.cmp_noun);
            //   response = response + word + "\t" + data.importance + "\n";
            // }
            // console.log(response);
          });
        }}
      >
        専門用語抽出
      </button>
      <p>{transcript}</p>
    </div>
  );
};

export default App;
