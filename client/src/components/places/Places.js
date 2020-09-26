import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPlaces } from '../../actions/place';
import PlaceList from './PlaceList';
import AddPlaceModal from './AddPlaceModal';
import EditPlaceModal from './EditPlaceModal';

const Places = ({ getPlaces, place: { places } }) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    getPlaces();
  }, [getPlaces]);

  const onSearch = (e) => {
    setSearch(e.target.value);
  };

  const filterSearch =
    places !== null &&
    places.filter((plc) => {
      return plc.title.toLowerCase().includes(search.toLowerCase());
    });

  return (
    <>
      <PlaceList selectedItem={filterSearch} onSearch={onSearch} />
      <AddPlaceModal />
      <EditPlaceModal />
    </>
  );
};

Places.propTypes = {
  place: PropTypes.object.isRequired,
  getPlaces: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  place: state.place
});

export default connect(mapStateToProps, { getPlaces })(Places);
