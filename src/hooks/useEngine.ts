import { useCallback, useEffect, useState } from "react";
import useWords from "./useWords";
import useCountdownTimer from "./useCountdownTimer";
import useKeyboard from "./useKeyboard";
import { countErrors } from "../utils/helper";

type State = "START" | "RUN" | "FINISH";

const NUMBER_OF_WORDS = 12;
const TIMER = 30;

const useEngine = () => {
  const [state, setState] = useState<State>("START");
  const { words, updateWords } = useWords(NUMBER_OF_WORDS);
  const { timeLeft, startContdown, resetCountDown } = useCountdownTimer(TIMER);
  const { clearTyped, cursor, resetTyped, totalTyped, typed } = useKeyboard(
    state !== "FINISH"
  );

  const [errors, setErrors] = useState(0);

  const isStarting = state === "START" && cursor > 0;
  const areWordsFinished = cursor === words.length;

  const sumErrors = useCallback(() => {
    const wordsReached = words.substring(0, Math.min(cursor, words.length));
    setErrors((prevErrors) => prevErrors + countErrors(typed, wordsReached));
  }, [typed, words, cursor]);

  useEffect(() => {
    if (isStarting) {
      setState("RUN");
      startContdown();
    }
  }, [isStarting, startContdown, cursor]);

  useEffect(() => {
    if (!timeLeft) {
      console.log("Time is up....");
      setState("FINISH");
      sumErrors();
    }
  }, [timeLeft, sumErrors]);

  useEffect(() => {
    if (areWordsFinished) {
      sumErrors();
      updateWords();
      clearTyped();
    }
  }, [clearTyped, areWordsFinished, updateWords, sumErrors]);

  const restart = useCallback(() => {
    resetCountDown();
    resetTyped();
    setState("START");
    setErrors(0);
    updateWords();
    clearTyped();
  }, [clearTyped, updateWords, resetCountDown, resetTyped]);

  return { state, words, timeLeft, typed, errors, restart, totalTyped };
};

export default useEngine;
