import React from 'react';
import { Field } from 'redux-form/immutable';
import { injectProps } from '../../helpers/decorators';

export default class LogIn extends React.Component {

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
}
