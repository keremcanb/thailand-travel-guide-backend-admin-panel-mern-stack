import PropTypes from 'prop-types';
import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { TextInput, Row } from 'react-materialize';
import { filterPlaces, clearFilter } from '../../actions/place';

const PlaceFilter = ({ filterPlaces, clearFilter, filtered }) => {
  const text = useRef('');

  useEffect(() => {
    if (!filtered) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterPlaces(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <Row className="row-grid filter">
      <TextInput ref={text} placeholder="Filter" onChange={onChange} />
    </Row>
  );
};

PlaceFilter.propTypes = {
  clearFilter: PropTypes.func.isRequired,
  filterPlaces: PropTypes.func.isRequired,
  filtered: PropTypes.any.isRequired
};

const mapStateToProps = (state) => ({
  filtered: state.filtered
});

export default connect(mapStateToProps, { filterPlaces, clearFilter })(
  PlaceFilter
);
