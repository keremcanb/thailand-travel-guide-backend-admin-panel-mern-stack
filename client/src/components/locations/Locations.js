/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getLocations } from '../../actions/location';
import LocationList from './LocationList';

const Locations = ({ getLocations, location: { locations } }) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    getLocations();
  }, [getLocations]);

  const onSearch = (e) => {
    setSearch(e.target.value);
  };

  const filterSearch =
    locations !== null &&
    locations.filter((loc) => {
      return loc.title.toLowerCase().includes(search.toLowerCase());
    });

  return (
    <>
      <LocationList selectedItem={filterSearch} onSearch={onSearch} />
      <div className="fixed-action-btn">
        <Link to="addlocation">
          <a className="btn-floating btn-large blue darken-2">
            <i className="large material-icons">add</i>
          </a>
        </Link>
      </div>
    </>
  );
};

Locations.propTypes = {
  location: PropTypes.object.isRequired,
  getLocations: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  location: state.location
});

export default connect(mapStateToProps, { getLocations })(Locations);
