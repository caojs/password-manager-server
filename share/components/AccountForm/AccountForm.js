import React from 'react';
import { Field } from 'redux-form/immutable';
import PasswordGenerator from '../PasswordGenerator';
import { injectProps } from '../../helpers/decorators';

function Form({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <Field name="title" component="input"/>
      </label>
      <label>
        Account:
        <Field name="account" component="input"/>
      </label>
      <label>
        Password:
        <Field name="password" component="input"/>
      </label>
      <label>
        Info:
        <Field name="info" component="textarea"/>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default class AccountForm extends React.Component {

  @injectProps
  render({ errors, dispatch, handleSubmit, change }) {
    let component;

    if (errors && errors.size) {
      component = (
        <ul>
          {errors.map((e, index) => (
            <li key={index}>Error: {e.get('message')}</li>
          ))}
        </ul>
      );
    }
    else {
      component = (
        <div>
          <PasswordGenerator onCopy={value => dispatch(change('password', value))}/>
          <Form handleSubmit={handleSubmit}/>
        </div>
      );
    }

    return React.Children.only(component);
  }
}
