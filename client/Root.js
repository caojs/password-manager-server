import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Map } from 'immutable';
import createStore from './store';
import Routes from './components/Routes';

const store = createStore(Map({}));

const Root = React.createClass({
  render() {

    let Component = <Routes/>;
    if (process.env.NODE_ENV === 'development') {
      const DevTools = require('./components/DevTools.js').default;
      Component = (
        <div>
          <Routes/>
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
});

ReactDOM.render(<Root/>, document.getElementById('app'));
