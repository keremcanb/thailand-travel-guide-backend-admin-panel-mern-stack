import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { TextInput, Button, Row, Icon, Container } from 'react-materialize';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';
import { register } from '../../actions/auth';

const Register = ({ register, isAuthenticated }) => {
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
    if (!firstName) {
      M.toast({ html: 'Please enter name' });
    } else if (!lastName) {
      M.toast({ html: 'Please enter surname' });
    } else if (!email) {
      M.toast({ html: 'Please enter email' });
    } else if (!password || !password2) {
      M.toast({ html: 'Please enter password' });
    } else if (password !== password2) {
      M.toast({ html: 'Passwords do not match' });
    } else {
      register({ firstName, lastName, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container className="center mt form-container">
      <Row>
        <form onSubmit={onSubmit}>
          <TextInput
            id="register-name"
            label="Name"
            name="firstName"
            value={firstName}
            onChange={onChange}
            s={12}
            m={6}
          />
          <TextInput
            id="register-surname"
            label="Surname"
            name="lastName"
            value={lastName}
            onChange={onChange}
            s={12}
            m={6}
          />
          <TextInput
            id="register-email"
            email
            label="Email"
            name="email"
            value={email}
            onChange={onChange}
            s={12}
            m={12}
          />
          <TextInput
            id="register-password"
            password
            label="Password"
            name="password"
            value={password}
            onChange={onChange}
            s={12}
            m={6}
          />
          <TextInput
            id="register-password2"
            password
            label="Confirm Password"
            name="password2"
            value={password2}
            onChange={onChange}
            s={12}
            m={6}
          />
          <Row s={12} m={12}>
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
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register })(Register);
