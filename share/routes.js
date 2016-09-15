import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import { hookContext } from './helpers/routeHooks';

import Layout from './components/Layout';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import NotFound from './components/NotFound';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import { UpdateForm, AddForm } from './components/AccountForm';
import AccountInfo from './components/AccountInfo';

export default function routes(store) {
  const storeContext = hookContext(store);

  return (
    <Route path='/' component={Layout}>
      <Route
        path='login'
        component={LogIn}
        onEnter={storeContext(LogIn.onEnter)}/>
      <Route
        path='signup'
        component={SignUp}
        onEnter={storeContext(LogIn.onEnter)}/>
      <Route path='404' component={NotFound}/>
      <Route
        onEnter={storeContext(Dashboard.onEnter)}
        components={{
          main: Dashboard,
          child: Sidebar
        }}>
        <IndexRoute
          component={AddForm}/>
        <Route
          path='edit/:id'
          component={UpdateForm}/>
        <Route
          path='account/:id'
          component={AccountInfo}/>
      </Route>
      <Redirect from='*' to='/404'/>
    </Route>
  );
}
