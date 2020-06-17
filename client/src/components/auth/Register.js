import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
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
    return <Redirect to='/dashboard' />;
  }

  return (
    <Container>
      <Row className='justify-content-center'>
        <Col md={4}>
          <h1 className='large text-primary'>Sign Up</h1>
          <p className='lead'>
            <i className='fas fa-user' /> Create Your Account
          </p>
          <Form onSubmit={(e) => onSubmit(e)}>
            <Form.Group>
              <Form.Control
                type='text'
                placeholder='firstName'
                name='firstName'
                value={firstName}
                onChange={(e) => onChange(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type='text'
                placeholder='lastName'
                name='lastName'
                value={lastName}
                onChange={(e) => onChange(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type='email'
                placeholder='Email Address'
                name='email'
                value={email}
                onChange={(e) => onChange(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type='password'
                placeholder='Password'
                name='password'
                value={password}
                onChange={(e) => onChange(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type='password'
                placeholder='Confirm Password'
                name='password2'
                value={password2}
                onChange={(e) => onChange(e)}
              />
            </Form.Group>
            <Button type='submit' variant='primary' value='Register'>
              Register
            </Button>
          </Form>
          <p className='my-1'>
            Already have an account? <Link to='/login'>Sign In</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
