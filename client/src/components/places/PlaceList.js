import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Preloader } from 'react-materialize';
import PlaceItem from './PlaceItem';
import { getPlaces } from '../../actions/place';
import SearchBar from '../layout/SearchBar';

const Places = ({
  selectedItem,
  onSearch,
  getPlaces,
  place: { places, loading }
}) => {
  useEffect(() => {
    getPlaces();
  }, [getPlaces]);

  return !(loading || places === null) ? (
    <>
      <SearchBar onSearch={onSearch} />
      <Row>
        {!loading && selectedItem.length !== 0 ? (
          <Col className="grid-style">
            {selectedItem.map((place) => (
              <PlaceItem key={place._id} place={place} />
            ))}
          </Col>
        ) : (
          <p className="center">No places to show</p>
        )}
      </Row>
    </>
  ) : (
    <Preloader
      className="loader"
      active
      color="blue"
      flashing={false}
      size="big"
    />
  );
};

Places.propTypes = {
  getPlaces: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  place: PropTypes.object.isRequired,
  selectedItem: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  place: state.place
});

export default connect(mapStateToProps, { getPlaces })(Places);
