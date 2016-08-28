import React from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';

const LogIn = ({ error }) => (
  <form method="post" action="/login">

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
    <button type="submit">Sign In</button>
  </form>
);

LogIn.onEnter = (nextState, replace, { getState }) => {
  const user = getState().get('user');
  if (user) {
    replace('/');
  }
};

export default connect(
  (state) => ({
    error: state.getIn(['flash', 'error'], Immutable.List())
  })
)(LogIn);
