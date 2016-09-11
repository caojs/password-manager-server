import React from 'react';
import { Field } from 'redux-form/immutable';
import { injectProps } from '../../helpers/decorators';

function Form({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <Field name="username" component="input" type="text"/>
      </label>

      <label>
        Password:
        <Field name="password" component="input" type="password"/>
      </label>

      <label>
        Password Again:
        <Field name="passwordAgain" component="input" type="password"/>
      </label>

      <button type="submit">Sign Up</button>
    </form>
  )
}

export default class SignUp extends React.Component {

  @injectProps
  render({ errors, handleSubmit }) {

    let errorMessages = (errors && errors.size) ? (
        <ul>
          {errors.map((e, index) => (
            <li key={index}>{e.get('message')}</li>
          ))}
        </ul>) :
        null;

    return (
      <div>
        {errorMessages}
        <Form handleSubmit={handleSubmit} />
      </div>
    );
  }

}
