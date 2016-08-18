import React from 'react';

class LogIn extends React.Component {
  static preLoad({ params, store }) {
  }

  render() {
    return (
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
  }
}

export default LogIn;
