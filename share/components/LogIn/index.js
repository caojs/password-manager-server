import React from 'react';
import { connect } from 'react-redux';
import { createAction } from 'redux-actions';
import { reduxForm } from 'redux-form/immutable'
import Immutable from 'immutable';

import LogIn from './LogIn';
import redirectTo from '../redirectTo';
import { post } from '../../api';

@connect(state => {
  const user = state.get('user') || Immutable.Map();
  return {
    userData: user.get('data'),
    errors: user.get('errors')
  };
})
@redirectTo('/', ({ userData }) => userData && userData.size)
@reduxForm({
  form: 'login',
  onSubmit: (form, dispatch) => post('/login', form.toJS()).then(dispatch)
})
class LogInContainer extends LogIn {}

LogInContainer.onEnter = (nextState, replace, { getState }) => {
  const user = getState().getIn(['user', 'data']);
  if (user && user.size) {
    replace('/');
  }
};

export default LogInContainer;
