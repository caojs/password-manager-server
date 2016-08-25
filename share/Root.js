import React from 'react';
import { Provider } from 'react-redux';

let devTools = null;

if(process.env.NODE_ENV === 'development') {
  const DevTools = require('./components/DevTools.js').default;
  devTools = <DevTools/>;
}

class Root extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (devTools) {
      this.setState({ devTools });
    }
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <div>
          {this.props.children}
          {this.state.devTools}
        </div>
      </Provider>
    );
  }
}

export default Root;
