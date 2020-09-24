import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, ProgressBar } from 'react-materialize';
import LocationItem from './LocationItem';
import { getLocations } from '../../actions/location';

const Locations = ({ getLocations, location: { locations, loading } }) => {
  useEffect(() => {
    getLocations();
  }, [getLocations]);

  return loading || locations === null ? (
    <ProgressBar />
  ) : (
    <Row>
      {!loading && locations.length === 0 ? (
        <p className="center">No locations to show...</p>
      ) : (
        <Col style={gridStyle}>
          {locations.map((location) => (
            <LocationItem key={location._id} location={location} />
          ))}
        </Col>
      )}
    </Row>
  );
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  justifyContent: 'center',
  alignContent: 'center',
  gridGap: '5rem'
};

Locations.propTypes = {
  location: PropTypes.object.isRequired,
  getLocations: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  location: state.location
});

export default connect(mapStateToProps, { getLocations })(Locations);
