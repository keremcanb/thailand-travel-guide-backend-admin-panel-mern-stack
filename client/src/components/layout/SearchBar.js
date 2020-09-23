import React from 'react';
import { Form } from 'react-bootstrap';

const SearchBox = ({ onSearch }) => {
  return (
    <Form>
      <Form.Group className='mt-3'>
        <Form.Control type='search' placeholder='Filter' onChange={onSearch} />
      </Form.Group>
    </Form>
  );
};

export default SearchBox;
