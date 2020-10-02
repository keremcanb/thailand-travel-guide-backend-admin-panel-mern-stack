import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TextInput, Button, Icon, Row, Col } from 'react-materialize';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Row className="rowStyle">
      <form onSubmit={onSubmit}>
        <TextInput
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={onChange}
          s={12}
        />
        <TextInput
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={onChange}
          minLength="6"
          s={12}
        />
        <Button
          type="submit"
          value="Login"
          variant="contained"
          color="primary"
          className="right"
        >
          Login
          <Icon right>login</Icon>
        </Button>
      </form>
    </Row>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
