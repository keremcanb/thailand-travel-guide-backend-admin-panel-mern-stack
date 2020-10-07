/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Preloader, Button, Icon } from 'react-materialize';
import { Link } from 'react-router-dom';
import LocationItem from './LocationItem';
import { getLocations } from '../../actions/location';
import LocationFilter from './LocationFilter';

const Locations = ({
  getLocations,
  filtered,
  location: { locations, loading }
}) => {
  useEffect(() => {
    getLocations();
  }, [getLocations]);

  return (
    <>
      <LocationFilter />
      {locations !== null && !loading ? (
        <Row>
          <Col className="grid-style">
            {filtered !== null
              ? filtered.map((location) => (
                  <LocationItem key={location._id} location={location} />
                ))
              : locations.map((location) => (
                  <LocationItem key={location._id} location={location} />
                ))}
          </Col>
        </Row>
      ) : (
        <Preloader
          className="loader"
          active
          color="blue"
          flashing={false}
          size="big"
        />
      )}
      <Link to="addlocation">
        <Button
          className="blue darken-2"
          fab
          floating
          large
          node="button"
          icon={<Icon>add</Icon>}
        />
      </Link>
    </>
  );
};

Locations.propTypes = {
  getLocations: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  location: state.location,
  filtered: state.location.filtered
});

export default connect(mapStateToProps, { getLocations })(Locations);
