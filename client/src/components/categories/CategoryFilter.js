import PropTypes from 'prop-types';
import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { TextInput, Row } from 'react-materialize';
import { filterCategories, clearFilter } from '../../actions/category';

const CategoryFilter = ({ filterCategories, clearFilter, filtered }) => {
  const text = useRef('');

  useEffect(() => {
    if (!filtered) {
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
    <Row className="row-grid filter">
      <TextInput ref={text} placeholder="Filter" onChange={onChange} />
    </Row>
  );
};

CategoryFilter.propTypes = {
  clearFilter: PropTypes.func.isRequired,
  filterCategories: PropTypes.func.isRequired,
  filtered: PropTypes.any.isRequired
};

const mapStateToProps = (state) => ({
  filtered: state.filtered
});

export default connect(mapStateToProps, { filterCategories, clearFilter })(
  CategoryFilter
);
