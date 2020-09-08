import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const AddItem = ({ addItem }) => {
  const initialFormState = { title: '', thumbnail: '' };
  const [item, setItem] = useState(initialFormState);
  const [itemAdded, setItemAdded] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    addItem(item);
    setItemAdded(true);
    setItem(initialFormState);
  }

  function onChange(e) {
    setItem({ ...item, [e.target.name]: e.target.value });
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Control
            name='title'
            placeholder='Title *'
            value={item.title}
            onChange={onChange}
            type='text'
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            name='thumbnail'
            placeholder='Thumbnail *'
            value={item.thumbnail}
            onChange={onChange}
            type='text'
            required
          />
        </Form.Group>
        <Container className='text-center'>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            startIcon={<AddIcon />}
          >
            Add
          </Button>
        </Container>
      </Form>
      {itemAdded && (
        <Container className='d-flex justify-content-center mt-2'>
          <h5>Location added</h5>
        </Container>
      )}
    </>
  );
};

export default AddItem;
