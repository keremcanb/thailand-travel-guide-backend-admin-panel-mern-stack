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
  display: 'grid',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '30px'
};

export default SearchBox;
