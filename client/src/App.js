import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { loadUser } from './store/actions/auth';
import setAuthToken from './utils/setAuthToken';
import store from './store/store';
import { LOGOUT } from './store/types';
import Routes from './components/routing/Routes';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Login from './screens/auth/Login';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route component={Routes} />
        </Switch>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
