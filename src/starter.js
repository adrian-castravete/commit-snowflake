"use strict";

import Snowflake from './snowflake';

let paper = document.getElementById('paper');
let snowflake = new Snowflake(paper);
snowflake.setString('Adrian Castravete');
snowflake.generate();

let textField = document.createElement('input');
textField.setAttribute('type', 'text');
textField.setAttribute('size', '40');
textField.setAttribute('value', '');
textField.addEventListener('keyup', function () {
  let value = textField.value;

  if (/^[0-9a-f]+$/i.test(value)) {
    snowflake.setHexString(value);
  } else {
    snowflake.setString(value);
  }
  snowflake.generate();
});
document.body.appendChild(textField);

