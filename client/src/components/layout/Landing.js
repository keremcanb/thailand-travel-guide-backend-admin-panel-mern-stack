import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Col, Row } from 'react-bootstrap';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Container>
      <Row className='justify-content-center'>
        <Col md={4} className='align-self-center'>
          <section className='landing'>
            <div className='dark-overlay'>
              <div className='landing-inner'>
                <h1 className='x-large'>TGR Admin</h1>
                <div className='buttons'>
                  {/* <Link to='/register' className='btn btn-primary'>
                    Sign Up
                  </Link> */}
                  <Link to='/login' className='btn btn-light'>
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </Col>
      </Row>
    </Container>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
