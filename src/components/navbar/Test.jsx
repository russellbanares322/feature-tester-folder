import React, { useState, useEffect, useRef } from "react";

const Test = () => {
  const [secondsInput, setSecondsInput] = useState(0);
  const [minutesInput, setMinutesInput] = useState(0);
  const [hoursInput, setHoursInput] = useState(0);
  const [timeInterval, setTimeInterVal] = useState(null);
  const [color, setColor] = useState("#1877F2");
  const secRef = useRef();
  const minRef = useRef();
  const hrRef = useRef();

  const hours = hoursInput * 3600000;
  const minutes = minutesInput * 60000;
  const seconds = secondsInput * 1000;
  const totalTime = hours + minutes + seconds;
  const startTime = Date.now();
  const futureTime = startTime + totalTime;

  const handleSecChange = (e) => {
    const limit = 2;
    setSecondsInput(e.target.value.slice(0, limit));
  };
  const handleMinChange = (e) => {
    const limit = 2;
    setMinutesInput(e.target.value.slice(0, limit));
  };
  const handleHourChange = (e) => {
    const limit = 2;
    setHoursInput(e.target.value.slice(0, limit));
  };

  const handleReset = () => {
    setHoursInput(hrRef.current);
    setMinutesInput(minRef.current);
    setSecondsInput(secRef.current);
    clearInterval(timeInterval);
  };
  const handleSetTimerInterval = (e) => {
    e.preventDefault();
    const timer = setInterval(() => {
      const currentTime = Date.now();
      const remainingTime = futureTime - currentTime;

      //Conversion of time
      const hrs = Math.floor(
        (remainingTime / (1000 * 60 * 60)) % 24
      ).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
      const mins = Math.floor(
        (remainingTime / (1000 * 60)) % 60
      ).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
      const secs = Math.floor((remainingTime / 1000) % 60).toLocaleString(
        "en-US",
        { minimumIntegerDigits: 2, useGrouping: false }
      );

      setHoursInput(hrs);
      setMinutesInput(mins);
      setSecondsInput(secs);

      if (remainingTime <= 5000) {
        setColor("red");
      }
      if (remainingTime < 0) {
        clearInterval(timer);
        setHoursInput(0);
        setMinutesInput(0);
        setSecondsInput(0);
        setColor("#1877F2");
      }
    });

    setTimeInterVal(timer);
  };

  useEffect(() => {
    secRef.current.focus();
    if (secondsInput.length === 2) {
      minRef.current.focus();
    }
    if (minutesInput.length === 2) {
      hrRef.current.focus();
    }
  }, [secondsInput, minutesInput]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <input
          ref={secRef}
          style={{ width: "4rem", paddingLeft: "1rem" }}
          type="number"
          onChange={handleSecChange}
        />
        Seconds
        <input
          ref={minRef}
          style={{ width: "4rem", paddingLeft: "1rem" }}
          type="number"
          onChange={handleMinChange}
        />
        Minutes
        <input
          ref={hrRef}
          style={{ width: "4rem", paddingLeft: "1rem" }}
          type="number"
          onChange={handleHourChange}
        />
        Hours
      </div>
      <div style={{ display: "flex", gap: "3rem", justifyContent: "center" }}>
        <h1 style={{ color: color }}>Hours: {hoursInput || "00"}</h1>
        <h1 style={{ color: color }}>Minutes: {minutesInput || "00"}</h1>
        <h1 style={{ color: color }}>Seconds: {secondsInput || "00"}</h1>
        <button onClick={handleSetTimerInterval} style={{ width: "8rem" }}>
          Set Timer
        </button>
        <button onClick={handleReset} style={{ width: "8rem" }}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Test;
