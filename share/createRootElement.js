import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Map } from 'immutable';
import createStore from './store';

export default function createRootElement(initialState = {}, router) {
  const store = createStore(Map(initialState));

  let Component = router;

  if (process.env.NODE_ENV === 'development') {
    const DevTools = require('./components/DevTools.js').default;
    Component = (
      <div>
        {router}
        <DevTools/>
      </div>
    );
  }

  return (
    <Provider store={store}>
      {Component}
    </Provider>
  );
}
