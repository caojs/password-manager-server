import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import Immutable from 'immutable';

import { signup } from '../actionCreators';

const enhance = compose(
  connect(state => ({
    error: state.getIn(['flash', 'error'], Immutable.List())
  })),
  reduxForm({
    form: 'signup',
    onSubmit: (form, dispatch) => dispatch(signup(form.toJS()))
  })
);

const SignUp = enhance(({ error, handleSubmit }) => (
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
      <Field name="password" component="input" type="password"/>
    </label>
    <label>
      Password Again:
      <Field name="passwordAgain" component="input" type="password"/>
    </label>
    <button type="submit">Sign Up</button>
  </form>
));

export default SignUp;
