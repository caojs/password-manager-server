import React from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import withReducer from 'recompose/withReducer';
import withProps from 'recompose/withProps';

import { argsify } from '../helpers/qlHelpers';
import { addAccount } from '../actionCreators';
import PasswordGenerator from './PasswordGenerator';

const reducer = (state, action) => {
  state = state.set(action.type.toLowerCase(), action.payload);
  return state;
};

const enhance = compose(
  connect(null, { addAccount }),
  withReducer('form', 'onChange', reducer, Immutable.Map({})),
  withProps(props => ({
    onChange: (type, payload) => props.onChange({ type, payload })
  })),
  withHandlers({
    onSubmit: ({ addAccount, form }) => e => {
      e.preventDefault();
      addAccount(
        `mutation {
          upsertAccount(${argsify(form.toJS())}) {
            id,
            title,
            account,
            password,
            info,
            userId
          }
        }`
      );
    }
  }),
);

const AccountForm = enhance(
  ({ form, onChange, onSubmit }) => (
    <div>
      <PasswordGenerator onCopy={(pass) => onChange('PASSWORD', pass)}/>
      <form onSubmit={onSubmit}>
        <label>
          Title:
          <input
            value={form.get('title', '')}
            onChange={(e) => onChange('TITLE', e.target.value)}/>
        </label>
        <label>
          Account:
          <input
            value={form.get('account', '')}
            onChange={(e) => onChange('ACCOUNT', e.target.value)}/>
        </label>
        <label>
          Password:
          <input
            value={form.get('password', '')}
            onChange={(e) => onChange('PASSWORD', e.target.value)}/>
        </label>
        <label>
          Info:
          <textarea
            value={form.get('info', '')}
            onChange={(e) => onChange('INFO', e.target.value)}/>
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  )
);

export default AccountForm;
