import React from 'react';
import { TextInput, Row, Col } from 'react-materialize';

const SearchBox = ({ onSearch }) => {
  return (
    <Row style={rowStyle}>
      <Col>
        <TextInput type="search" placeholder="Filter" onChange={onSearch} />
      </Col>
    </Row>
  );
};

const rowStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

export default SearchBox;
