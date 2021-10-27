import React from "react";
import { makeStyles } from "@material-ui/core";

export default function Marker({ char, open }) {
  const useStyles = makeStyles((theme) => ({
    div: {
      background: "none",
      width: "60px",
      position: "absolute",
      border: "3px solid red",
      top: "360px",
      left: (char) => {
        return `${120 + char.id * 70 + (open ? 170 : 0)}px`;
      },
      display: (char) => {
        return char.found ? "block" : "none";
      },
      height: "90px",
    },
  }));
  const classes = useStyles(char);
  return (
    <div className={classes.div}>
      <svg
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="60"
        height="90"
        viewBox="0 0 94.926 94.926"
      >
        <g>
          <path
            d="M55.931,47.463L94.306,9.09c0.826-0.827,0.826-2.167,0-2.994L88.833,0.62C88.436,0.224,87.896,0,87.335,0
		c-0.562,0-1.101,0.224-1.498,0.62L47.463,38.994L9.089,0.62c-0.795-0.795-2.202-0.794-2.995,0L0.622,6.096
		c-0.827,0.827-0.827,2.167,0,2.994l38.374,38.373L0.622,85.836c-0.827,0.827-0.827,2.167,0,2.994l5.473,5.476
		c0.397,0.396,0.936,0.62,1.498,0.62s1.1-0.224,1.497-0.62l38.374-38.374l38.374,38.374c0.397,0.396,0.937,0.62,1.498,0.62
		s1.101-0.224,1.498-0.62l5.473-5.476c0.826-0.827,0.826-2.167,0-2.994L55.931,47.463z"
            fill="red"
          />
        </g>
      </svg>
    </div>
  );
}
