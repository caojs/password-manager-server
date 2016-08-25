import React from 'react';

const LogIn = () => (
  <form method="post" action="/login">
    <label>
      Username:
      <input name="username"/>
    </label>
    <label>
      Password:
      <input type="password" name="password"/>
    </label>
    <button type="submit">Sign In</button>
  </form>
)

export default LogIn;
