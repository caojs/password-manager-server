import React from 'react';
import { Provider } from 'react-redux';

export default function createRootElement(store, router) {
  let component = router;

  if (process.env.NODE_ENV === 'development') {
    const DevTools = require('./components/DevTools.js').default;
    component = (
      <div>
        {router}
        <DevTools/>
      </div>
    );
  }

  return (
    <Provider store={store}>
      {component}
    </Provider>
  );
}
