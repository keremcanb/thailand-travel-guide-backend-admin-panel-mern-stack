import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, ProgressBar } from 'react-materialize';
import LocationItem from './LocationItem';
import { getLocations } from '../../actions/location';
import SearchBar from '../layout/SearchBar';

const Locations = ({
  selectedItem,
  onSearch,
  getLocations,
  location: { locations, loading }
}) => {
  useEffect(() => {
    getLocations();
  }, [getLocations]);

  const gridStyle = {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    alignItems: 'space-evenly',
    alignContent: 'space-evenly',
    gridGap: '5px'
  };

  return loading || locations === null ? (
    <ProgressBar className="blue" />
  ) : (
    <>
      <SearchBar onSearch={onSearch} />
      <Row>
        {!loading && selectedItem.length === 0 ? (
          <p className="center">No locations to show...</p>
        ) : (
          <Col style={gridStyle}>
            {selectedItem.map((location) => (
              <LocationItem key={location._id} location={location} />
            ))}
          </Col>
        )}
      </Row>
    </>
  );
};

Locations.propTypes = {
  getLocations: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  location: state.location
});

export default connect(mapStateToProps, { getLocations })(Locations);
