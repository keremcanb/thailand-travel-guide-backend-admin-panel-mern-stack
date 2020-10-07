/* eslint-disable react/prop-types */
import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { TextInput, Row } from 'react-materialize';
import { filterCategories, clearFilter } from '../../actions/category';

const CategoryFilter = ({ filterCategories, clearFilter, filtered }) => {
  const text = useRef('');

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterCategories(e.target.value);
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

export default connect(mapStateToProps, { filterCategories, clearFilter })(
  CategoryFilter
);
