import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLocations } from '../../actions/location';
import LocationList from './LocationList';
import AddLocationModal from './AddLocationModal';
import EditLocationModal from './EditLocationModal';

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
      <AddLocationModal />
      <EditLocationModal />
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
