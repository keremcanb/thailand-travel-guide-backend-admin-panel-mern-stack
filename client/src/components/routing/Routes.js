import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../../screens/auth/Login';
import Register from '../../screens/auth/Register';
import Dashboard from '../../components/layout/Dashboard';
import NotFound from '../../components/layout/NotFound';
import PrivateRoute from './PrivateRoute';
import Locations from '../../screens/locations/Locations';
import Categories from '../../screens/categories/Categories';
import Places from '../../screens/places/Places';
import AddLocation from '../../screens/locations/AddLocation';
import AddCategory from '../../screens/categories/AddCategory';
import AddPlace from '../../screens/places/AddPlace';
import EditLocation from '../../screens/locations/EditLocation';
import EditCategory from '../../screens/categories/EditCategory';
import EditPlace from '../../screens/places/EditPlace';

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
