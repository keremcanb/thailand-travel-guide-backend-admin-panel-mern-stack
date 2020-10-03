import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Dashboard from '../layout/Dashboard';
import NotFound from '../layout/NotFound';
import PrivateRoute from './PrivateRoute';
import Locations from '../locations/Locations';
import Categories from '../categories/Categories';
import Places from '../places/Places';
import AddLocation from '../locations/AddLocation';
import AddCategory from '../categories/AddCategory';
import AddPlace from '../places/AddPlace';
import EditLocation from '../locations/EditLocation';
import EditCategory from '../categories/EditCategory';
import EditPlace from '../places/EditPlace';

const Routes = () => {
  return (
    <section className="container">
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/locations" component={Locations} />
        <PrivateRoute exact path="/categories" component={Categories} />
        <PrivateRoute exact path="/places" component={Places} />
        <PrivateRoute exact path="/addlocation" component={AddLocation} />
        <PrivateRoute exact path="/addcategory" component={AddCategory} />
        <PrivateRoute exact path="/addplace" component={AddPlace} />
        <PrivateRoute exact path="/editlocation" component={EditLocation} />
        <PrivateRoute exact path="/editcategory" component={EditCategory} />
        <PrivateRoute exact path="/editplace" component={EditPlace} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
