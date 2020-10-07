import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Preloader, Button, Icon } from 'react-materialize';
import { Link } from 'react-router-dom';
import PlaceItem from './PlaceItem';
import { getPlaces } from '../../actions/place';
import PlaceFilter from './PlaceFilter';

const Places = ({ getPlaces, place: { places, loading, filtered } }) => {
  useEffect(() => {
    getPlaces();
  }, [getPlaces]);

  return (
    <>
      <PlaceFilter />
      {places && !loading ? (
        <Row>
          <Col className="grid-style">
            {filtered
              ? filtered.map((place) => (
                  <PlaceItem key={place._id} place={place} />
                ))
              : places.map((place) => (
                  <PlaceItem key={place._id} place={place} />
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
      <Link to="addplace">
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

Places.propTypes = {
  getPlaces: PropTypes.func.isRequired,
  place: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  place: state.place,
  filtered: state.filtered
});

export default connect(mapStateToProps, { getPlaces })(Places);
