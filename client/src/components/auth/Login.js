import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { TextInput, Button, Col, Row } from 'react-materialize';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;

  function onChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    login(email, password);
  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <Row style={rowStyle}>
        <Col>
          <Form onSubmit={onSubmit}>
            <TextInput
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
            <TextInput
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
              minLength="6"
              required
            />
            <Button
              type="submit"
              value="Login"
              variant="contained"
              color="primary"
              onSubmit={onSubmit}
              className="float-right"
            >
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

const rowStyle = {
  display: 'grid',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '30px'
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
