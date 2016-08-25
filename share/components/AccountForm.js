import React from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { compose, withHandlers, withReducer, mapProps } from 'recompose';

import PasswordGenerator from './PasswordGenerator';

const reducer = (state, action) => {
  state = state.set(action.type.toLowerCase(), action.payload);
  return state;
};

const enhance = compose(
  withReducer('form', 'dispatch', reducer, Immutable.Map({})),
  mapProps(({ form, dispatch, onSubmit }) => ({
    form,
    onSubmit,
    dispatch,
    change: (type, payload) => dispatch({ type, payload }),
  })),
  withHandlers({
    onSubmit: props => e => {
      console.log(props);
      e.preventDefault();
    }
  }),
);

const AccountForm = enhance(
  ({ form, change, onSubmit }) => (
    <div>
      <PasswordGenerator onCopy={(pass) => change('PASSWORD', pass)}/>
      <form onSubmit={onSubmit}>
        <label>
          Title:
          <input
            value={form.get('title', '')}
            onChange={(e) => change('TITLE', e.target.value)}/>
        </label>
        <label>
          Account:
          <input
            value={form.get('account', '')}
            onChange={(e) => change('ACCOUNT', e.target.value)}/>
        </label>
        <label>
          Password:
          <input
            value={form.get('password', '')}
            onChange={(e) => change('PASSWORD', e.target.value)}/>
        </label>
        <label>
          Info:
          <textarea
            value={form.get('info', '')}
            onChange={(e) => change('INFO', e.target.value)}/>
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  )
);

export default AccountForm;
