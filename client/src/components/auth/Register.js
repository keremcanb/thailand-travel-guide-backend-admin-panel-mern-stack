import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { TextInput, Button, Row, Icon, Container } from 'react-materialize';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: ''
  });
  const { firstName, lastName, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ firstName, lastName, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container className="cont-main">
      <Row>
        <form onSubmit={onSubmit}>
          <TextInput
            label="Name"
            name="firstName"
            value={firstName}
            onChange={onChange}
            s={12}
            m={6}
          />
          <TextInput
            label="Surname"
            name="lastName"
            value={lastName}
            onChange={onChange}
            s={12}
            m={6}
          />
          <TextInput
            email
            label="Email"
            name="email"
            value={email}
            onChange={onChange}
            s={12}
            m={12}
          />
          <TextInput
            password
            label="Password"
            name="password"
            value={password}
            onChange={onChange}
            s={12}
            m={6}
          />
          <TextInput
            password
            label="Confirm Password"
            name="password2"
            value={password2}
            onChange={onChange}
            s={12}
            m={6}
          />
          <Row className="right" s={12} m={12}>
            <Button
              className="blue darken-2"
              type="submit"
              variant="contained"
              value="Register"
            >
              Register
              <Icon right>add</Icon>
            </Button>
            <p>
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </Row>
        </form>
      </Row>
    </Container>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
