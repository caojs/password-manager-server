import React from 'react';
import ReactDOM from 'react-dom';

const Test = React.createClass({
  render() {
    return (
      <div>Test</div>
    )
  }
});

ReactDOM.render(<Test/>, document.getElementById('app'));
