import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../auth/Login';
import Dashboard from '../layout/Dashboard';
import NotFound from '../layout/NotFound';
import PrivateRoute from './PrivateRoute';
import Location from '../../Location';
import Category from '../../Category';
import Place from '../../Place';
import Alert from '../layout/Alert';
// import Register from '../auth/Register';

const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/locations" component={Location} />
        <PrivateRoute exact path="/categories" component={Category} />
        <PrivateRoute exact path="/places" component={Place} />
        <Route component={NotFound} />
        {/* <Route exact path='/register' component={Register} /> */}
      </Switch>
    </section>
  );
};

export default Routes;
