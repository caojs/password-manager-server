import React from 'react';
import classNames from 'classnames';
import { Field } from 'redux-form/immutable';
import { Link } from 'react-router';
import FaUser from 'react-icons/lib/fa/user';
import FaLock from 'react-icons/lib/fa/lock';
import Button from '../Common/Button';
import ErrorMessages from '../Common/ErrorMessages';
import { injectProps } from '../../helpers/decorators';

import style from './LogIn.css';

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
      </div>

      <Button
        className={classNames({ error: hasErrors })}
        type="submit">
        Sign In
      </Button>
    </form>
  );
}

export default class LogIn extends React.Component {

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
          <Link className="link" to="/signup">Sign up</Link>
        </div>
      </div>
    );
  }

}
