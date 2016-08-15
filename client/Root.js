import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Map } from 'immutable';
import createStore from './store';

const store = createStore(Map({}));

const Root = React.createClass({
  render() {

    let Component;
    if (process.env.NODE_ENV === 'development') {
      const DevTools = require('./components/DevTools.js').default;
      Component = (
        <div>
          <div>Development</div>
          <DevTools/>
        </div>
      );
    }
    else {
      Component = (<div>Production</div>)
    }

    return (
      <Provider store={store}>
        {Component}
      </Provider>
    );
  }
});

ReactDOM.render(<Root/>, document.getElementById('app'));
