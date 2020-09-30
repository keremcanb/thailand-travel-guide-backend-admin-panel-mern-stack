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

  const rowStyle = {
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30px'
  };

  return (
    <Row style={rowStyle}>
      <Col>
        <form onSubmit={onSubmit}>
          <Row>
            <TextInput
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={onChange}
              required
            />
          </Row>
          <Row>
            <TextInput
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={onChange}
              minLength="6"
              required
            />
          </Row>
          <Row>
            <Button
              type="submit"
              value="Login"
              variant="contained"
              color="primary"
              className="right"
              waves="light"
            >
              Login
              <Icon right>login</Icon>
            </Button>
          </Row>
        </form>
      </Col>
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
