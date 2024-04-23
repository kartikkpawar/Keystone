import { useCallback, useEffect, useRef, useState } from "react";

const useCountdownTimer = (seconds: number) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const intervalRef = useRef<any>(null);

  const startContdown = useCallback(() => {
    console.log("Starting the timer....");
    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft - 1);
    }, 1000);
  }, [setTimeLeft]);

  const resetCountDown = useCallback(() => {
    console.log("Resetting the timer....");
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTimeLeft(seconds);
  }, [seconds]);

  useEffect(() => {
    if ((!timeLeft || timeLeft < 0) && intervalRef.current) {
      console.log("Timer Completed....");
      clearInterval(intervalRef.current);
    }
  }, [timeLeft, intervalRef]);

  return { startContdown, resetCountDown, timeLeft };
};

export default useCountdownTimer;
