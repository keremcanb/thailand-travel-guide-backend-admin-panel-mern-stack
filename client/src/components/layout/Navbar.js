import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar, NavItem, Icon, Row } from 'react-materialize';
import { logout } from '../../actions/auth';

const Navigation = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <Row>
      <Link as={Link} to="/locations" href="/locations">
        Locations
      </Link>
      <Link as={Link} to="/categories" href="/categories">
        Categories
      </Link>
      <Link as={Link} to="/places" href="/places">
        Places
      </Link>
      <NavItem onClick={logout}>
        <Icon>logout</Icon>
      </NavItem>
    </Row>
  );

  return (
    <Navbar
      // className="blue darken-3"
      alignLinks="right"
      brand={
        <a className="brand-logo" href="/">
          TGR Admin
        </a>
      }
      centerChildren
      id="mobile-nav"
      menuIcon={<Icon>menu</Icon>}
      options={{
        draggable: true,
        edge: 'left',
        inDuration: 250,
        onCloseEnd: null,
        onCloseStart: null,
        onOpenEnd: null,
        onOpenStart: null,
        outDuration: 200,
        preventScrolling: true
      }}
    >
      {!loading && isAuthenticated && authLinks}
    </Navbar>
  );
};

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navigation);
