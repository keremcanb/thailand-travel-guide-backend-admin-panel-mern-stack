import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../auth/Login';
import Dashboard from '../layout/Dashboard';
import NotFound from '../layout/NotFound';
import PrivateRoute from './PrivateRoute';
import Log from '../../Log';
import Category from '../../Category';
import Place from '../../Place';
import Alert from '../layout/Alert';
// import Locations from '../items/Locations';
// import Categories from '../items/Categories';
// import Places from '../items/Places';
// import Register from '../auth/Register';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/logs' component={Log} />
        <PrivateRoute exact path='/categories' component={Category} />
        <PrivateRoute exact path='/places' component={Place} />
        <Route component={NotFound} />
        {/* <Route exact path='/register' component={Register} /> */}
        {/* <PrivateRoute exact path='/locations' component={Locations} /> */}
        {/* <PrivateRoute exact path='/categories' component={Categories} /> */}
        {/* <PrivateRoute exact path='/places' component={Places} /> */}
      </Switch>
    </section>
  );
};

export default Routes;
