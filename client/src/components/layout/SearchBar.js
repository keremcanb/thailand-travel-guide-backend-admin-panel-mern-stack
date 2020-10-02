import PropTypes from 'prop-types';
import React from 'react';
import { TextInput, Row } from 'react-materialize';

const SearchBox = ({ onSearch }) => {
  return (
    <Row className="row-grid" style={{ marginBottom: '5px' }}>
      <TextInput type="search" placeholder="Filter" onChange={onSearch} />
    </Row>
  );
};

SearchBox.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default SearchBox;
