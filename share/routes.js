import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import Layout from './components/Layout.js';
import LogIn from './components/LogIn.js';
import SignUp from './components/SignUp.js';
import NotFound from './components/NotFound.js';
import Dashboard from './components/Dashboard.js';

const routes = (
  <Route path="/" component={Layout}>
    <Route path="login" component={LogIn}/>
    <Route path="signup" component={SignUp}/>
    <Route path="404" component={NotFound}/>
    <Route component={Dashboard}>
      <IndexRoute component={LogIn}/>
      <Route path="/:id" component={SignUp}/>
    </Route>
    <Redirect from="*" to="/404"/>
  </Route>
);

export default routes;
