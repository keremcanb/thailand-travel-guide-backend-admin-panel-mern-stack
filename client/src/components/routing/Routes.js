import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../auth/Login';
import Dashboard from '../layout/Dashboard';
import NotFound from '../layout/NotFound';
import PrivateRoute from './PrivateRoute';
import Locations from '../items/Locations';
import Categories from '../items/Categories';
import Places from '../items/Places';
import Alert from '../layout/Alert';
// import Register from '../auth/Register';
import App from '../../Logs';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/login' component={Login} />
        {/* <Route exact path='/register' component={Register} /> */}
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/app' component={App} />
        <PrivateRoute exact path='/locations' component={Locations} />
        <PrivateRoute exact path='/locations' component={Locations} />
        <PrivateRoute exact path='/categories' component={Categories} />
        <PrivateRoute exact path='/places' component={Places} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
