import React from 'react';
import { connect } from 'react-redux';
import { createAction } from 'redux-actions';
import { reduxForm } from 'redux-form/immutable'
import Immutable from 'immutable';

import LogIn from './LogIn';
import { post } from '../../api';

@reduxForm({
  form: 'login',
  onSubmit: (form, dispatch) => post('/login', form.toJS()).then(dispatch)
})
@connect(state => ({
  error: state.getIn(['flash', 'error'], Immutable.List())
}))
class LogInContainer extends LogIn {}

LogInContainer.onEnter = (nextState, replace, { getState }) => {
  const user = getState().get('user');
  if (user) {
    replace('/');
  }
};

export default LogInContainer;
