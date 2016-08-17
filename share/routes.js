import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import Layout from './components/Layout.js';
import Dashboard from './components/Dashboard.js';
import LogIn from './components/LogIn.js';
import SignUp from './components/SignUp.js';
import NotFound from './components/NotFound.js';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={Dashboard}/>
    <Route path="login" component={LogIn}/>
    <Route path="signup" component={SignUp}/>
    <Route path="/404" component={NotFound}/>
    <Redirect from="*" to="/404"/>
  </Route>
);

export default routes;
