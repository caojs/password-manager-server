import React from 'react';
import { browserHistory, Router, Route, IndexRoute, Redirect } from 'react-router';
import Layout from './Layout.js';
import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import NotFound from './NotFound.js';
import Dashboard from './Dashboard.js';

class Routes extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Layout}>
          <IndexRoute component={Dashboard}/>
          <Route path="signin" component={SignIn}/>
          <Route path="signup" component={SignUp}/>
          <Route path="/404" component={NotFound}/>
          <Redirect from="*" to="/404"/>
        </Route>
      </Router>
    );
  }
}

export default Routes;
