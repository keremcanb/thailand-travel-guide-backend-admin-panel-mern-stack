import { Route, Switch } from 'react-router-dom';
import Login from '../../screens/auth/Login';
import Register from '../../screens/auth/Register';
import Dashboard from '../layout/Dashboard';
import NotFound from '../layout/NotFound';
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

const Routes = () => (
  <section className="container">
    <Switch>
      <Route path="/" component={Dashboard} exact />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/locations" component={Locations} />
      <PrivateRoute path="/categories" component={Categories} />
      <PrivateRoute path="/places" component={Places} />
      <PrivateRoute path="/addlocation" component={AddLocation} />
      <PrivateRoute path="/addcategory" component={AddCategory} />
      <PrivateRoute path="/addplace" component={AddPlace} />
      <PrivateRoute path="/editlocation" component={EditLocation} />
      <PrivateRoute path="/editcategory" component={EditCategory} />
      <PrivateRoute path="/editplace" component={EditPlace} />
      <Route component={NotFound} />
    </Switch>
  </section>
);

export default Routes;
