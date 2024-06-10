import { useEffect, useState } from "react";
import Token from "../types/Token";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const kuromojiBuilder = kuromoji.builder({
  dicPath: "../kuromoji/dict",
});
let prevEndIndex = 0;

const useGensen = () => {
  const [script, setScript] = useState("");
  const [tokens, setTokens] = useState<Token[]>([]);

  useEffect(() => {
    kuromojiBuilder.build((_, tokenizer) => {
      const target = script.slice(prevEndIndex);
      const tokenized_word = tokenizer.tokenize(target);
      const cmp_noun_list_val = cmp_noun_list(tokenized_word);
      /** 頻度 */
      const frequency = list2key_value(cmp_noun_list_val);
      const score_lr_val = score_lr(frequency, IGNORE_WORDS, 1, 1);
      const term_importance_val = term_importance(frequency, score_lr_val);
      const score_lt_list = sort_by_importance(term_importance_val);

      const tokens: Token[] = tokenized_word.map((word) => {
        return { string: word.surface_form, term: null };
      });

      console.log(score_lt_list)

      for (let i = 0; i < score_lt_list.length; i++) {
        const score_lt = score_lt_list[i];
        console.log(score_lt)

        const tokenized = score_lt.cmp_noun.split(" ");
        console.log(tokenized);

        for (let j = 0; j < tokens.length - tokenized.length + 1; j++) {
          const sliced = tokens.slice(j, j + tokenized.length)
          console.log(sliced);
          if (sliced.some(s => s.term !== null)) continue;
          if (sliced.every((s, i) => s.string === tokenized[i])) {
            const term = modify_agglutinative_lang(score_lt.cmp_noun);
            sliced.forEach(s => s.term = term);
            break;
          }
        }
      }

      setTokens(tokens);
      console.log(tokens)

      const lastChar = script[-1];
      if (lastChar === "。" || lastChar === ".") {
        prevEndIndex += script.length;
      }
    })
  }, [script]);

  return { script, tokens, setScript }
}

export default useGensen;