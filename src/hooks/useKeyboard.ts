import { useCallback, useEffect, useRef, useState } from "react";
import { isKeyAllowed } from "../utils/helper";

const useKeyboard = (enabled: boolean) => {
  const [cursor, setCursor] = useState(0);
  const [typed, setTyped] = useState<string>("");
  const totalTyped = useRef(0);

  const keyPressHandler = useCallback(
    ({ key, code }: KeyboardEvent) => {
      if (!enabled || !isKeyAllowed(code)) return;

      switch (key) {
        case "Backspace":
          setTyped((prev) => prev.slice(0, -1));
          setCursor(cursor - 1);
          totalTyped.current -= 1;
          break;
        default:
          setTyped((prev) => prev.concat(key));
          setCursor(cursor + 1);
          totalTyped.current += 1;
      }
    },
    [cursor, enabled]
  );

  const clearTyped = useCallback(() => {
    setTyped("");
    setCursor(0);
  }, []);
  const resetTyped = useCallback(() => {
    totalTyped.current = 0;
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", keyPressHandler);
    return () => {
      window.removeEventListener("keydown", keyPressHandler);
    };
  }, [keyPressHandler]);
  return {
    typed,
    cursor,
    totalTyped: totalTyped.current,
    clearTyped,
    resetTyped,
  };
};

export default useKeyboard;
