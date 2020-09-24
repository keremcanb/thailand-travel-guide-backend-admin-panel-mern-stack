import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, ProgressBar } from 'react-materialize';
import PlaceItem from './PlaceItem';
import { getPlaces } from '../../actions/place';

const Places = ({ getPlaces, place: { places, loading } }) => {
  useEffect(() => {
    getPlaces();
  }, [getPlaces]);

  return loading || places === null ? (
    <ProgressBar />
  ) : (
    <Row>
      {!loading && places.length === 0 ? (
        <p className="center">No places to show...</p>
      ) : (
        <Col style={gridStyle}>
          {places.map((place) => (
            <PlaceItem key={place._id} place={place} />
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
  gridGap: '3rem'
};

Places.propTypes = {
  place: PropTypes.object.isRequired,
  getPlaces: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  place: state.place
});

export default connect(mapStateToProps, { getPlaces })(Places);
