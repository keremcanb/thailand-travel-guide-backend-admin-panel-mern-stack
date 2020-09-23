import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Routes from './components/routing/Routes';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import store from './store';
import './App.css';
// import Landing from './components/layout/Landing';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Login} />
          {/* <Route exact path='/' component={Landing} /> */}
          <Route component={Routes} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
