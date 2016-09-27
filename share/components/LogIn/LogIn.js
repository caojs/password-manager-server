import React from 'react';
import { Field } from 'redux-form/immutable';
import { Link } from 'react-router';
import FaUser from 'react-icons/lib/fa/user';
import FaLock from 'react-icons/lib/fa/lock';
import FaExclamation from 'react-icons/lib/fa/exclamation-triangle';
import { injectProps } from '../../helpers/decorators';

import style from './LogIn.css';
import error from '../common/error.css';

function Form({ handleSubmit }) {
  return (
    <form
      className={style.form}
      onSubmit={handleSubmit}>

      <div className={style.field}>
        <label className={style.label}>
          <FaUser className={style.user}/>
          <Field
            className={style.input}
            name="username"
            component="input"
            placeholder="Username"/>
        </label>

        <label className={style.label}>
          <FaLock className={style.lock}/>
          <Field
            className={style.input}
            name="password"
            component="input"
            type="password"
            placeholder="Password"/>
        </label>
      </div>

      <button className={style.button} type="submit">Sign In</button>
    </form>
  );
}

export default class LogIn extends React.Component {

  @injectProps
  render({ errors, handleSubmit }) {

    let errorMessages = null;
    if (errors && errors.size) {
      errorMessages = (
        <ul className={error.main}>
          <li className={error.icon}>
            <FaExclamation className="icon"/>
          </li>
          {errors.map((e, index) => (
            <li className={error.item} key={index}>{e.get('message')}</li>
          ))}
        </ul>
      );
    }

    return (
      <div className={style.main}>
        {errorMessages}
        <Form handleSubmit={handleSubmit}/>
        <div className={style.links}>
          <Link className="link" to="/signup">Sign up</Link>
        </div>
      </div>
    );
  }

}
