"use strict";

import Snowflake from "./snowflake";

let paper = document.getElementById("paper");
let snowflake = new Snowflake(paper);
snowflake.setString("Adrian Castravete");
snowflake.generate();

let textField = document.getElementById("commitInput");
textField.addEventListener("keyup", function() {
  let value = textField.value;

  if (/^[0-9a-f]+$/i.test(value)) {
    snowflake.setHexString(value);
  } else {
    snowflake.setString(value);
  }
  snowflake.generate();
});

let startButton = document.getElementById("startTicker");
let stopButton = document.getElementById("stopTicker");
let ticker = null;
let tick = 0;

function tickerFunction() {
  textField.value = tick.toString(16);
  snowflake.setHexString(textField.value);
  snowflake.generate();
  tick += 1;
  ticker = window.setTimeout(tickerFunction, 1000);
}

startButton.addEventListener("click", () => {
  startButton.setAttribute("disabled", "disabled");
  stopButton.removeAttribute("disabled");
  tick = 0;
  tickerFunction();
});

stopButton.addEventListener("click", () => {
  startButton.removeAttribute("disabled");
  stopButton.setAttribute("disabled", "disabled");

  if (ticker) {
    window.clearTimeout(ticker);
    ticker = null;
  }
});
