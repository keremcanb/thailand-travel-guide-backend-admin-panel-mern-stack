import PropTypes from 'prop-types';
import React from 'react';
import { TextInput, Row, Col } from 'react-materialize';

const SearchBox = ({ onSearch }) => {
  return (
    <Row className="row-grid">
      <Col>
        <TextInput type="search" placeholder="Filter" onChange={onSearch} />
      </Col>
    </Row>
  );
};

SearchBox.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default SearchBox;
