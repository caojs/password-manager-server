import React from 'react';
import FaExclamation from 'react-icons/lib/fa/exclamation-triangle';
import { injectProps } from '../../helpers/decorators';

import style from './errorMessages.css';

export default class ErrorMessages extends React.Component {
  @injectProps
  render({ errors }) {
    return (
      <ul className={style.main}>
        <li className={style.icon}>
          <FaExclamation className="icon"/>
        </li>
        {errors.map((e, index) => (
          <li className={style.item} key={index}>{e.get('message')}</li>
        ))}
      </ul>
    );
  }
}
