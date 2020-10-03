import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Navbar, NavItem, Icon } from 'react-materialize';
import { logout } from '../../actions/auth';

const Navigation = ({ auth: { isAuthenticated, loading }, logout }) => {
  const guestLinks = [
    <NavLink key={1} to="/login" href="/login" className="sidenav-close">
      Login
    </NavLink>
    // <NavLink key={2} to="/register" href="/register" className="sidenav-close">
    //   Register
    // </NavLink>
  ];

  const authLinks = [
    <NavLink
      key={1}
      to="/locations"
      href="/locations"
      className="sidenav-close"
    >
      Locations
    </NavLink>,
    <NavLink
      key={2}
      to="/categories"
      href="/categories"
      className="sidenav-close"
    >
      Categories
    </NavLink>,
    <NavLink key={3} to="/places" href="/places" className="sidenav-close">
      Places
    </NavLink>,
    <NavItem key={4} onClick={logout}>
      <Icon>logout</Icon>
    </NavItem>
  ];

  return (
    <Navbar
      fixed
      alignLinks="right"
      centerChildren
      id="mobile-nav"
      className="indigo"
      menuIcon={<Icon>menu</Icon>}
      brand={
        <>
          <img
            src="/logo.png"
            alt="logo"
            style={{ marginRight: '10px', marginTop: '6px' }}
          />
          <a className="brand-logo" href="/">
            TGR
          </a>
        </>
      }
    >
      {!loading && isAuthenticated ? authLinks : guestLinks}
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
