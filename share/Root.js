import React from 'react';
import { Provider } from 'react-redux';

let main = null;
let devTools = null;

if(process.env.NODE_ENV === 'development') {
  const DevTools = require('./components/DevTools.js').default;
  devTools = <DevTools/>;
}

class Root extends React.Component {
  componentWillMount() {
    // prevent change props
    this.store = this.props.store;
  }

  render() {
    return (
      <Provider store={this.store}>
        <div>
          {this.props.children}
          {devTools}
        </div>
      </Provider>
    );
  }
}

export default Root;
