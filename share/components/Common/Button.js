import React from 'react';
import classNames from 'classnames';
import { injectProps } from '../../helpers/decorators';

import style from './Button.css';

export default class Button extends React.Component {
  @injectProps
  render({ children, className, ...rest }) {
    let btnClass = classNames(style.button, className);
    console.log(rest);
    return (
      <button
        className={btnClass}
        {
          ...rest
        }>
        {children}
      </button>
    );
  }
}
