import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import NotFound from '../layout/NotFound';
import Profile from '../profile/Profile';
import PrivateRoute from '../routing/PrivateRoute';
import Deposite from '../deposite/Deposite';
import Loan from '../loan/Loan';
import Account from '../account/Account';
import Recipient from '../recipients/Recipient';

const Routes = (props) => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/deposite" component={Deposite} />
        <PrivateRoute exact path="/account" component={Account} />
        <PrivateRoute exact path="/loan" component={Loan} />

        <PrivateRoute exact path="/recipient" component={Recipient} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
