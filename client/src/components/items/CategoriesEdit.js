import React, { useState, useEffect } from 'react';
import { patch } from 'axios';
import Select from 'react-select';
import { Container, Form } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import makeAnimated from 'react-select/animated';
import UpdateIcon from '@material-ui/icons/Update';
import CancelIcon from '@material-ui/icons/Cancel';
import useResources from '../../utils/useResources';

const EditItem = ({ currentItem, updateItem, setEditingItem }) => {
  const [item, setItem] = useState(currentItem);
  const locations = useResources('locations');
  const animatedComponents = makeAnimated();

  useEffect(() => {
    setItem(currentItem);
  }, [currentItem]);

  function onSubmit(e) {
    e.preventDefault();
    async function patchItem() {
      try {
        await patch(`/api/categories/${item.id}`, item);
      } catch (error) {
        console.log(error);
      }
    }
    patchItem();
    updateItem(item.id, item);
  }

  function onChange(e) {
    setItem({ ...item, [e.target.name]: e.target.value });
  }

  function onSelect(value, action) {
    setItem({ ...item, [action.name]: value });
  }

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group>
        <Form.Control
          name='title'
          placeholder='Title'
          value={item.title}
          onChange={onChange}
          type='text'
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          name='thumbnail'
          placeholder='Thumbnail'
          value={item.thumbnail}
          onChange={onChange}
          type='text'
        />
      </Form.Group>
      <Form.Group>
        <Select
          name='locations'
          options={locations.map((loc) => ({
            value: loc.title,
            label: loc.title,
          }))}
          value={item.location}
          onChange={onSelect}
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
        />
      </Form.Group>
      <Container className='d-flex justify-content-center'>
        <Button
          type='submit'
          className='mr-2'
          variant='contained'
          color='primary'
          startIcon={<UpdateIcon />}
        >
          Update
        </Button>
        <Button
          variant='contained'
          startIcon={<CancelIcon />}
          onClick={() => setEditingItem(false)}
        >
          Cancel
        </Button>
      </Container>
    </Form>
  );
};

export default EditItem;
