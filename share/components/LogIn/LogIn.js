import React from 'react';
import { Field } from 'redux-form/immutable';
import { injectProps } from '../../helpers/decorators';

function Form({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <Field name="username" component="input"/>
      </label>

      <label>
        Password:
        <Field name="password" component="input" type="password"/>
      </label>

      <button type="submit">Sign In</button>
    </form>
  );
}

export default class LogIn extends React.Component {

  @injectProps
  render({ errors, handleSubmit }) {

    let errorMessages = null;
    if (errors && errors.size) {
      errorMessages = (
        <ul>
          {errors.map((e, index) => (
            <li key={index}>{e.get('message')}</li>
          ))}
        </ul>
      );
    }

    return (
      <div>
        {errorMessages}
        <Form handleSubmit={handleSubmit}/>
      </div>
    );
  }

}
