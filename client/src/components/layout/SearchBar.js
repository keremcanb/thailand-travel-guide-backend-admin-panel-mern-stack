import React from 'react';
import { TextInput, Row, Col } from 'react-materialize';

const SearchBox = ({ onSearch }) => {
  const rowStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  return (
    <Row style={rowStyle}>
      <Col>
        <TextInput type="search" placeholder="Filter" onChange={onSearch} />
      </Col>
    </Row>
  );
};

export default SearchBox;
