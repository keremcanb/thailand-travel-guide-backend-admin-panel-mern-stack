import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Navbar, NavItem, Icon } from 'react-materialize';
import { logout } from '../../actions/auth';

const Navigation = ({ auth: { isAuthenticated, loading }, logout }) => {
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
      {/* {!loading && isAuthenticated && (
        <> */}
      <NavLink to="/locations" href="/locations">
        Locations
      </NavLink>
      <NavLink to="/categories" href="/categories">
        Categories
      </NavLink>
      <NavLink to="/places" href="/places">
        Places
      </NavLink>
      <NavItem onClick={logout}>
        <Icon>logout</Icon>
      </NavItem>
      {/* </>
      )} */}
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
