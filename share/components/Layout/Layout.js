import React from 'react';

function Layout({ children, main, child, ...rest }) {
  return (
    <div>
      {children || React.cloneElement(main, { sidebar: child })}
    </div>
  );
}

export default Layout;
