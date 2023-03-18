import { intervalToDuration, isBefore } from "date-fns";
import React, { useMemo } from "react";

const CountDown: React.FC = () => {
  const importantDate = useMemo(() => new Date('2023-05-01T22:00Z'), []);

  const [time, setTime] = React.useState(
    intervalToDuration({
        start: new Date(),
        end: importantDate
      })
  );


  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(    
        intervalToDuration({
            start: new Date(),
            end: importantDate
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, [importantDate]);

  const countDownTimer = () => {
    const days = (time.days || 0) + 30* (time.months || 0);
    const hours = time.hours || 0;
    const minutes = time.minutes || 0;
    const seconds = time.seconds || 0;
    const dayString = days > 0 ? String(days) + ":" : "";
    const hourString = days > 0 || hours > 0 ? String(hours).padStart(2, "0") + ":" : "";
    const minuteString = days > 0 || hours > 0 || minutes > 0 ? String(time.minutes).padStart(2, "0") + ":" : "";
    const secondString = String(seconds).padStart(2, "0")
    return `${dayString}${hourString}${minuteString}${secondString}`;
  }

  const scale = 8;

  const getPx = () => {
    if (time.months && time.months > 0){
        return `${10+0*scale}px`;
    } else if (time.days && time.days >= 20){
        return `${10+1*scale}px`;
    } else if (time.days && time.days >= 10){
        return `${10+2*scale}px`;
    } else if (time.days && time.days >= 5){
        return `${10+3*scale}px`;
    } else if (time.days && time.days >= 3){
        return `${10+4*scale}px`;
    } else if (time.days && time.days >= 1){
        return `${10+5*scale}px`;
    } else {
        return `${10+6*scale}px`;
    }
  }

  if (isBefore(importantDate, new Date())) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <p
        style={{
          margin: "10px auto",
          fontSize: `${getPx()}`,
          fontFamily: "Roboto Mono",
        }}
      >
        {countDownTimer()}
      </p>
    </div>
  );
};

export default CountDown;
