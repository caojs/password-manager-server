import React from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import withReducer from 'recompose/withReducer';
import withProps from 'recompose/withProps';

import { addAccount } from '../actionCreators';
import PasswordGenerator from './PasswordGenerator';

const reducer = (state, action) => {
  state = state.set(action.type.toLowerCase(), action.payload);
  return state;
};

const enhance = compose(
  connect(null, { addAccount }),
  withReducer('form', 'change', reducer, Immutable.Map({})),
  withProps(props => ({
    change: (type, payload) => props.change({ type, payload })
  })),
  withHandlers({
    onSubmit: ({ addAccount, form }) => e => {
      e.preventDefault();
      addAccount(`
        mutation {
          account(
            title: "${form.get('title', '')}",
            account: "${form.get('account', '')}",
            password: "${form.get('password', '')}",
            info: "${form.get('info', '')}"
          ) {
            id,
            title,
            account,
            password,
            info,
            userId
          }
        }`);
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
