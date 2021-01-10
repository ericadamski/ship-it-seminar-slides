import React, { useState, useCallback, useRef } from "react";

const MINUTE = 60;

export default function Timer() {
  const timer = useRef();
  const timeRef = useRef(MINUTE);
  const [time, setTime] = useState(MINUTE);

  const stop = useCallback(() => {
    if (timer.current != null) {
      clearInterval(timer.current);
      timer.current = null;
      setTime((timeRef.current = MINUTE));
    }
  }, []);

  const start = useCallback(() => {
    timer.current = setInterval(() => {
      if (timeRef.current === 0) {
        stop();
        alert("Times up!");
      }

      setTime((timeRef.current -= 1));
    }, 1000);
  }, [stop]);

  const reset = useCallback(() => {
    stop();

    start();
  }, [start, stop]);

  return (
    <div
      style={{
        width: 300,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <p style={{ fontSize: "4rem" }}>{time}</p>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {time >= MINUTE ? <button onClick={start}>start</button> : null}
        {time >= MINUTE ? null : (
          <>
            <button onClick={reset}>reset</button>
            <button onClick={stop}>stop</button>
          </>
        )}
      </div>
    </div>
  );
}
