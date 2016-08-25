import React from 'react';

const SignUp = () => (
  <form method="post" action="/signup">
    <label>
      Username:
      <input name="username"/>
    </label>
    <label>
      Password:
      <input type="password" name="password"/>
    </label>
    <label>
      Password Again:
      <input type="password" name="passwordAgain"/>
    </label>
    <button type="submit">Sign Up</button>
  </form>
)

export default SignUp;
