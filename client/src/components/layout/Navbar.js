import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Nav, Navbar, Container } from 'react-bootstrap';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { logout } from '../../actions/auth';

const Navigation = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <>
      <Nav.Link as={Link} to='/locations' href='/locations'>
        Locations
      </Nav.Link>
      <Nav.Link as={Link} to='/categories' href='/categories'>
        Categories
      </Nav.Link>
      <Nav.Link as={Link} to='/places' href='/places'>
        Places
      </Nav.Link>
      <Nav.Link onClick={logout} href='#!'>
        <ExitToAppIcon />
      </Nav.Link>
    </>
  );

  return (
    <Navbar
      bg='dark'
      variant='dark'
      expand='lg'
      collapseOnSelect
      style={{ boxShadow: '0 8px 6px -6px #999', opacity: '0.9' }}
      fixed='top'
    >
      <Container>
        <Navbar.Brand>
          <img
            src='/tgr-logo.png'
            width='40'
            height='30'
            alt='logo'
            className='mr-3'
          />
          TGR Admin
        </Navbar.Brand>
        {isAuthenticated && (
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        )}
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='ml-auto'>
            {!loading && isAuthenticated && authLinks}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navigation);
