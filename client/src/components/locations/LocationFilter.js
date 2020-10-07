/* eslint-disable react/prop-types */
import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { TextInput, Row } from 'react-materialize';
import { filterLocations, clearFilter } from '../../actions/location';

const LocationFilter = ({ filterLocations, clearFilter, filtered }) => {
  const text = useRef('');

  useEffect(() => {
    if (filtered === null) {
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
    <Row className="row-grid" style={{ marginBottom: '5px', marginTop: '5px' }}>
      <TextInput ref={text} placeholder="Filter" onChange={onChange} />
    </Row>
  );
};

const mapStateToProps = (state) => ({
  filtered: state.filtered
});

export default connect(mapStateToProps, { filterLocations, clearFilter })(
  LocationFilter
);
