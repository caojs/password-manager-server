import React from 'react';
import { compose, withState, mapProps } from 'recompose';

const randomPassword = (length) => {
  let chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
  let pass = "";
  for (let x = 0; x < length; x++) {
      let i = Math.floor(Math.random() * chars.length);
      pass += chars.charAt(i);
  }
  return pass;
};

const enhance = compose(
  withState('pass', 'randomPass', ''),
  mapProps(({ pass, randomPass, onCopy }) => ({
    pass,
    onCopy: () => onCopy(pass),
    randomPass: () => randomPass(randomPassword(10))
  }))
);

const PasswordGenerator = enhance(
  ({ pass, randomPass, onCopy }) => (
    <div>
      <span>{pass}</span>
      <button onClick={randomPass}>Generate</button>
      <button onClick={onCopy}>Copy</button>
    </div>
  )
)

export default PasswordGenerator;
