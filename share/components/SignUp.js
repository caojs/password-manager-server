import React from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';

const SignUp = ({ error }) => (
  <form method="post" action="/signup">

    {error.size ?
      <ul>
        {error.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul> :
      null}

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

export default connect(
  (state) => ({
    error: state.getIn(['flash', 'error'], Immutable.List())
  })
)(SignUp);
