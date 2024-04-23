import clsx from "clsx";
import Caret from "./Caret";

const UserTypings = ({
  userInput,
  className,
  words,
}: {
  userInput: string;
  className?: string;
  words: string;
}) => {
  const typedCharacters = userInput.split("");

  return (
    <div className={className}>
      {typedCharacters.map((char, index) => (
        <Character
          key={`${char}-${index}`}
          char={char}
          expectedChar={words[index]}
        />
      ))}
      <Caret />
    </div>
  );
};

const Character = ({
  char,
  expectedChar,
}: {
  char: string;
  expectedChar: string;
}) => {
  return (
    <span
      className={clsx({
        "text-yellow-500": char === expectedChar,
        "text-red-500": char !== expectedChar && expectedChar !== " ",
        "bg-red-500/50": char !== expectedChar && expectedChar === " ",
      })}
    >
      {expectedChar}
    </span>
  );
};

export default UserTypings;
