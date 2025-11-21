import { useEffect, useState } from "react";

type toastProps = {
  message: string;
  exit: (value: string) => void;
};
export default function Toast({ message, exit }: toastProps) {
  const [width, setWidth] = useState(100);

  useEffect(() => {
    const interval = 10; // update every 10ms
    const step = (interval / 5000) * 100;

    const timer = setInterval(() => {
      setWidth((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          exit("");
          return 0;
        }
        return prev - step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [5000, exit]);
  return (
    <>
      <div className="absolute right-3 top-3 ring-[0.5px] rounded-lg p-3 w-60 md:w-80 bg-neutral-800">
        {message}
        <div
          className="h-1 bg-white transition-all"
          style={{ width: `${width}%` }}
        />
      </div>
    </>
  );
}
