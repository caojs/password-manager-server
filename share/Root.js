import React from 'react';
import { Provider } from 'react-redux';

let devTools = null;

if(process.env.NODE_ENV === 'development') {
  const DevTools = require('./components/DevTools.js').default;
  devTools = <DevTools/>;
}

class Root extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <div>
          {this.props.children}
          {devTools}
        </div>
      </Provider>
    );
  }
}

export default Root;
