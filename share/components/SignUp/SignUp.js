import React from 'react';
import { Link } from 'react-router';
import { Field } from 'redux-form/immutable';
import FaUser from 'react-icons/lib/fa/user';
import FaLock from 'react-icons/lib/fa/lock';
import classNames from 'classnames';
import Button from '../Common/Button';
import ErrorMessages from '../Common/ErrorMessages';
import { injectProps } from '../../helpers/decorators';

import style from './SignUp.css';

function Form({ hasErrors, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>

      <div className={style.fieldArea}>
        <label className={style.label}>
          <FaUser className="icon"/>
          <Field
            className="input"
            name="username"
            component="input"
            type="text"
            placeholder="Username"/>
        </label>

        <label className={style.label}>
          <FaLock className="icon"/>
          <Field
            className="input"
            name="password"
            component="input"
            type="password"
            placeholder="Password"/>
        </label>

        <label className={style.label}>
          <FaLock className="icon"/>
          <Field
            className="input"
            name="passwordAgain"
            component="input"
            type="password"
            placeholder="Password Again"/>
        </label>
      </div>

      <Button
        className={classNames({ error: hasErrors })}
        type="submit">
        Sign Up
      </Button>
    </form>
  )
}

export default class SignUp extends React.Component {

  @injectProps
  render({ errors, handleSubmit }) {
    const hasErrors = !!(errors && errors.size);

    let errorMessages = hasErrors ?
        <ErrorMessages errors={errors}/> :
        null;

    return (
      <div className={style.main}>
        {errorMessages}
        <Form
          hasErrors={hasErrors}
          handleSubmit={handleSubmit}/>
        <div className={style.links}>
          <Link className="link" to="/login">Log in</Link>
        </div>
      </div>
    );
  }

}
