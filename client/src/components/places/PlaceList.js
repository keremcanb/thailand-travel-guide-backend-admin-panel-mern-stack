import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, ProgressBar } from 'react-materialize';
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

  return loading || places === null ? (
    <ProgressBar className="blue" />
  ) : (
    <>
      <SearchBar onSearch={onSearch} />
      <Row>
        {!loading && selectedItem.length === 0 ? (
          <p className="center">No places to show...</p>
        ) : (
          <Col style={gridStyle}>
            {selectedItem.map((place) => (
              <PlaceItem key={place._id} place={place} />
            ))}
          </Col>
        )}
      </Row>
    </>
  );
};

const gridStyle = {
  display: 'flex',
  justifyContent: 'space-evenly',
  flexWrap: 'wrap',
  alignItems: 'space-evenly',
  alignContent: 'space-evenly',
  gridGap: '5px'
};

Places.propTypes = {
  place: PropTypes.object.isRequired,
  getPlaces: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  place: state.place
});

export default connect(mapStateToProps, { getPlaces })(Places);