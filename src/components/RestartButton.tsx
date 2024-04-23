import clsx from "clsx";
import { useRef } from "react";
import { MdRefresh } from "react-icons/md";

const RestartButton = ({
  onRestart: handleRestart,
  className,
}: {
  onRestart: () => void;
  className?: string;
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    buttonRef.current?.blur();
    handleRestart();
  };

  return (
    <button
      onClick={handleClick}
      ref={buttonRef}
      className={clsx(
        "block rounded px-8 py-2 hover:bg-slate-700/50",
        className
      )}
    >
      <MdRefresh className="h-6 w-6" />
    </button>
  );
};

export default RestartButton;
