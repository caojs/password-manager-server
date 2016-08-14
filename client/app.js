import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import { Map } from 'immutable';

const store = createStore(reducers, Map({}));

const App = React.createClass({
  render() {
    return (
      <Provider store={store}>
        <div>Test</div>
      </Provider>
    );
  }
});

ReactDOM.render(<App/>, document.getElementById('app'));
