import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import ImageUploader from 'react-images-upload';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import useResources from '../../utils/useResources';

const CategoriesAdd = (props) => {
  const initialFormState = { title: '', thumbnail: '', location: '' };
  const [item, setItem] = useState(initialFormState);
  // const [validated, setValidated] = useState(false);
  const [pictures, setPictures] = useState([]);
  const animatedComponents = makeAnimated();
  const locations = useResources('locations');
  const [itemAdded, setItemAdded] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    // const form = e.currentTarget;
    // if (form.checkValidity() === false) {
    //   e.preventDefault();
    //   e.stopPropagation();
    // }
    // setValidated(true);
    props.addItem(item);
    setItemAdded(true);
    setItem(initialFormState);
  }

  function onChange(e) {
    setItem({ ...item, [e.target.name]: e.target.value });
  }

  function onSelect(value, action) {
    setItem({ ...item, [action.name]: value });
  }

  function onDrop(picture) {
    setPictures([...pictures, picture]);
  }

  return (
    <>
      <Form
        // noValidate
        // validated={validated}
        onSubmit={onSubmit}
        className='needs-validation'
      >
        <Form.Group>
          <Form.Control
            name='title'
            placeholder='Title *'
            value={item.title}
            onChange={onChange}
            type='text'
            required
          />
          {/* <Form.Control.Feedback type='invalid'>
            Please provide a valid title.
          </Form.Control.Feedback> */}
        </Form.Group>
        {/* <Form.Group>
          <Form.Control
            name='thumbnail'
            placeholder='Thumbnail *'
            value={item.thumbnail}
            onChange={onChange}
            type='text'
            required
          />
          <Form.Control.Feedback type='invalid'>
            Please provide a valid image.
          </Form.Control.Feedback>
        </Form.Group> */}
        <Form.Group>
          <Select
            name='location'
            options={locations.map((loc) => ({
              value: loc.title,
              label: loc.title,
            }))}
            onChange={onSelect}
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
          />
        </Form.Group>
        <ImageUploader
          {...props}
          name='thumbnail'
          withIcon={false}
          onChange={onDrop}
          // onChange={() => {
          //   onDrop();
          //   onChange();
          // }}
          imgExtension={['.jpg', '.gif', '.png', '.gif']}
          maxFileSize={5242880}
          withPreview
          singleImage
          withLabel={false}
          value={item.thumbnail}
        />
        <Container className='d-flex justify-content-center'>
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
          <h5>Category added</h5>
        </Container>
      )}
    </>
  );
};

export default CategoriesAdd;
