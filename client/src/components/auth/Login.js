import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Form, Col, Row } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    return <Redirect to='/dashboard' />;
  }

  return (
    <Container className='mt-5'>
      <Row className='justify-content-center'>
        <Col md={4}>
          <Form onSubmit={onSubmit} className='mt-5'>
            <Form.Group>
              <Form.Control
                type='email'
                placeholder='Email'
                name='email'
                value={email}
                onChange={onChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type='password'
                placeholder='Password'
                name='password'
                value={password}
                onChange={onChange}
                minLength='6'
                required
              />
            </Form.Group>
            <Container className='d-flex justify-content-center'>
              <Button
                type='submit'
                value='Login'
                variant='contained'
                color='primary'
              >
                Login
              </Button>
            </Container>
          </Form>
          {/* <p className='my-1'>
            Do not have an account? <Link to='/register'>Sign Up</Link>
          </p> */}
        </Col>
      </Row>
    </Container>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
