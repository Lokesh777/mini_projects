import { useEffect, useRef, useState } from "react";

const StopWatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 100);
    }
    return () => {
      if(intervalRef.current){
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 600);
    const seconds = Math.floor((time % 600) / 10);
    const milliSecond = time % 10;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliSecond.toString().padStart(1, "0")}`;
  };

  return (
    <>
      <div>StopWatch</div>

      <p>{formatTime(time)}</p>

      <section style={{display:'flex', gap:"1rem"}}>
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button onClick={() => setTime(0)}>Reset</button>
      </section>
    </>
  );
};

export default StopWatch;
