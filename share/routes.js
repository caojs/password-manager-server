import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import Layout from './components/Layout';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import NotFound from './components/NotFound';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import AccountForm from './components/AccountForm';
import AccountInfo from './components/AccountInfo';

const routes = (
  <Route path='/' component={Layout}>
    <Route path='login' component={LogIn}/>
    <Route path='signup' component={SignUp}/>
    <Route path='404' component={NotFound}/>
    <Route path='503' component={NotFound}/>
    <Route
      component={Dashboard}
      onEnter={(nextState, replace) => { /*TODO: auth*/ }}>
      <IndexRoute
        components={{ sidebar: Sidebar, main: AccountForm }}/>
      <Route
        path='edit/:id'
        components={{ sidebar: Sidebar, main: AccountForm }}/>
      <Route
        path=':id'
        components={{ sidebar: Sidebar, main: AccountForm }}/>
    </Route>
    <Redirect from='*' to='/404'/>
  </Route>
);

export default routes;
