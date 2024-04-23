import { Fragment } from "react/jsx-runtime";
import RestartButton from "./components/RestartButton";
import Result from "./components/Result";
import UserTypings from "./components/UserTypings";
import { ReactNode } from "react";
import useEngine from "./hooks/useEngine";
import { calculateAccuracyPercentage } from "./utils/helper";

const App = () => {
  const { state, words, timeLeft, typed, errors, restart, totalTyped } =
    useEngine();

  return (
    <Fragment>
      <CountDownTimer timeLeft={timeLeft} />
      <WordContainer>
        <GenerateRandomWords words={words} />
        <UserTypings
          className="absolute inset-0"
          userInput={typed}
          words={words}
        />
      </WordContainer>
      <RestartButton
        onRestart={restart}
        className="mx-auto mt-10 text-slate-500"
      />
      <Result
        className="mt-10"
        state={state}
        errors={errors}
        accuractPercentage={calculateAccuracyPercentage(errors, totalTyped)}
        total={totalTyped}
      />
    </Fragment>
  );
};

const WordContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative max-w-xl mt-3  text-3xl leading-relaxed break-all">
      {children}
    </div>
  );
};

const GenerateRandomWords = ({ words }: { words: string }) => {
  return <div className="text-slate-500">{words}</div>;
};
const CountDownTimer = ({ timeLeft }: { timeLeft: number }) => {
  return <div className="text-yellow-500 font-medium">Time: {timeLeft}</div>;
};

export default App;
