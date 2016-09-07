import React from 'react';
import { Field } from 'redux-form/immutable';
import PasswordGenerator from '../PasswordGenerator';

function AccountForm({ dispatch, handleSubmit, change }) {
  return (
    <div>
      <PasswordGenerator
        onCopy={value => dispatch(change('password', value))}/>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <Field
            name="title"
            component="input"/>
        </label>
        <label>
          Account:
          <Field
            name="account"
            component="input"/>
        </label>
        <label>
          Password:
          <Field
            name="password"
            component="input"/>
        </label>
        <label>
          Info:
          <Field
            name="info"
            component="textarea"/>
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default AccountForm;
