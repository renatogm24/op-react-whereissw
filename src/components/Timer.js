import { ListItemText } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { toDate, format, differenceInMilliseconds } from "date-fns";

export default function Timer({ timerIsRunning, setTimerIsRunning, saveData }) {
  const [startTime, setStartTime] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState("00:00");

  useEffect(() => {
    const checkForTimer = setTimeout(() => {
      if (timerIsRunning) {
        clearInterval(checkForTimer);
        setStartTime(toDate(new Date()));

        const timer = setInterval(() => {
          const timeAux = format(
            differenceInMilliseconds(new Date(), startTime),
            "mm:ss"
          );
          console.log(timeAux);
          setTimeElapsed(timeAux);

          if (timerIsRunning) {
            clearInterval(timer);
            //setTimeElapsed(timeElapsed);
            //saveData();
          }
        }, 1000);
      }
    }, 1000);
  });

  return <ListItemText primary={timeElapsed} />;
}
