import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, routerShape } from 'react-router';
import hoistStatics from 'hoist-non-react-statics';

export default function redirectTo(path, predicate) {
  return (WrappedComponent) => {

    let Redirector = React.createClass({
      propTypes: { router: routerShape.isRequired },

      componentWillReceiveProps(nextProps) {
        const { router } = nextProps;
        if (predicate(nextProps, this.props))
          router.replace(path);
      },

      render() {
        return <WrappedComponent {...this.props}/>
      }
    });

    Redirector = hoistStatics(withRouter(Redirector), WrappedComponent);

    return Redirector;
  }
}
