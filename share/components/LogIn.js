import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createAction } from 'redux-actions';
import { Field, reduxForm } from 'redux-form/immutable'
import Immutable from 'immutable';

import { login } from '../actionCreators';

const enhance = compose(
  connect(state => ({
    error: state.getIn(['flash', 'error'], Immutable.List())
  })),
  reduxForm({
    form: 'login',
    onSubmit: (form, dispatch) => dispatch(login(form.toJS()))
  })
);

const LogIn = enhance(({ error, handleSubmit }) => (
  <form onSubmit={handleSubmit}>

    {error && error.size ?
      <ul>
        {error.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul> :
      null}

    <label>
      Username:
      <Field name="username" component="input" type="text"/>
    </label>
    <label>
      Password:
      <Field name="password" component="input" type="text"/>
    </label>
    <button type="submit">Sign In</button>
  </form>
));

LogIn.onEnter = (nextState, replace, { getState }) => {
  const user = getState().get('user');
  if (user) {
    replace('/');
  }
};

export default LogIn;
