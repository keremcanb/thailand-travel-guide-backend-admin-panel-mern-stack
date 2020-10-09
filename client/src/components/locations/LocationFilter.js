import PropTypes from 'prop-types';
import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { TextInput, Row } from 'react-materialize';
import { filterLocations, clearFilter } from '../../actions/location';

const LocationFilter = ({ filterLocations, clearFilter, filtered }) => {
  const text = useRef('');

  useEffect(() => {
    if (!filtered) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterLocations(e.target.value);
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

LocationFilter.propTypes = {
  clearFilter: PropTypes.func.isRequired,
  filterLocations: PropTypes.func.isRequired,
  filtered: PropTypes.any.isRequired
};

const mapStateToProps = (state) => ({
  filtered: state.filtered
});

export default connect(mapStateToProps, { filterLocations, clearFilter })(
  LocationFilter
);
