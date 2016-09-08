import React from 'react';
import { connect } from 'react-redux';
import { createAction } from 'redux-actions';
import { reduxForm } from 'redux-form/immutable'
import Immutable from 'immutable';

import LogIn from './LogIn';
import redirectTo from '../redirectTo';
import { post } from '../../api';

@connect(state => ({
  user: state.get('user')
}))
@redirectTo('/', ({ user }) => user && user.size)
@reduxForm({
  form: 'login',
  onSubmit: (form, dispatch) => post('/login', form.toJS()).then(dispatch)
})
class LogInContainer extends LogIn {}

LogInContainer.onEnter = (nextState, replace, { getState }) => {
  const user = getState().get('user');
  if (user) {
    replace('/');
  }
};

export default LogInContainer;
