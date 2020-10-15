import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput, Button, Icon, Row, Container } from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import { login } from '../../actions/auth';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      M.toast({ html: 'Please enter email' });
    } else if (!password) {
      M.toast({ html: 'Please enter password' });
    } else {
      dispatch(login(email, password));
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container className="center mt auth-container">
      <Row>
        <form onSubmit={onSubmit}>
          <TextInput
            id="email"
            label="Email"
            email
            value={email}
            onChange={onChange}
            s={12}
          />
          <TextInput
            id="password"
            label="Password"
            value={password}
            onChange={onChange}
            minLength="6"
            password
            s={12}
          />
          <Row s={12} m={12}>
            <Button
              className="blue darken-2"
              type="submit"
              value="Login"
              variant="contained"
            >
              Login
              <Icon right>login</Icon>
            </Button>
            {/* <p>
              Do not have an account? <Link to="/register">Register</Link>
            </p> */}
          </Row>
        </form>
      </Row>
    </Container>
  );
};

export default Login;
