import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createAction } from 'redux-actions';
import { reduxForm } from 'redux-form/immutable'
import Immutable from 'immutable';

import LogIn from './LogIn';
import { post } from '../../api';

const enhance = compose(
  connect(state => ({
    error: state.getIn(['flash', 'error'], Immutable.List())
  })),
  reduxForm({
    form: 'login',
    onSubmit: (form, dispatch) => post('/login', form.toJS()).then(dispatch)
  })
);

const LogInContainer = enhance(LogIn);

LogInContainer.onEnter = (nextState, replace, { getState }) => {
  const user = getState().get('user');
  if (user) {
    replace('/');
  }
};

export default LogInContainer;
