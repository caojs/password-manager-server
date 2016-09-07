import React from 'react';
import { Field } from 'redux-form/immutable';
import { injectProps } from '../../helpers/decorators';

export default class SignUp extends React.Component {

  @injectProps
  render({ error, handleSubmit }) {
    return (
      <form onSubmit={handleSubmit}>

        {error && error.size ?
          <ul>
            {error.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul> :
          null}

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
    );
  }
}
