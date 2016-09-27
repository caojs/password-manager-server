import React from 'react';
import FaClose from 'react-icons/lib/fa/close';
import FaMinus from 'react-icons/lib/fa/minus';
import style from './Layout.css';

function Layout({ children, main, child, ...rest }) {
  return (
    <div className={style.main}>
      <div className={style.bar}>
        <FaClose className={style.close}/>
        <FaMinus className={style.minus}/>
      </div>
      <div className={style.inner}>
        {children || React.cloneElement(main, { sidebar: child })}
      </div>
    </div>
  );
}

export default Layout;
