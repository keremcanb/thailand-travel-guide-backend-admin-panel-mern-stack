import React, { useState, useEffect } from 'react';
import { patch } from 'axios';
import { Container, Form, Col, Row } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import UpdateIcon from '@material-ui/icons/Update';
import CancelIcon from '@material-ui/icons/Cancel';
import useResources from '../../utils/useResources';

const EditItem = ({ currentItem, updateItem, setEditingItem }) => {
  const [item, setItem] = useState(currentItem);
  const locations = useResources('locations');
  const categories = useResources('categories');
  const {
    title,
    image,
    thumbnail,
    content,
    location,
    category,
    info,
    link,
    lat,
    lng,
  } = item;

  useEffect(() => {
    setItem(currentItem);
  }, [currentItem]);

  function onSubmit(e) {
    e.preventDefault();
    async function patchItem() {
      try {
        await patch(`/api/places/${item.id}`, item);
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

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group>
        <Form.Control
          name='title'
          placeholder='Title'
          value={title}
          onChange={onChange}
          type='text'
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          name='image'
          placeholder='Image'
          value={image}
          onChange={onChange}
          type='text'
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          name='thumbnail'
          placeholder='Thumbnail'
          value={thumbnail}
          onChange={onChange}
          type='text'
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          name='content'
          placeholder='Content'
          value={content}
          onChange={onChange}
          as='textarea'
          type='text'
          rows='3'
        />
      </Form.Group>
      <Form.Group>
        <Row>
          <Col>
            <Form.Control
              name='location'
              value={location}
              onChange={onChange}
              as='select'
            >
              {locations.map((loc) => (
                <option key={loc._id} value={loc.title}>
                  {loc.title}
                </option>
              ))}
            </Form.Control>
          </Col>
          <Col>
            <Form.Control
              name='category'
              onChange={onChange}
              value={category}
              as='select'
            >
              {categories.map((cat) => (
                <option key={cat._id} value={cat.title}>
                  {cat.title}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Row>
      </Form.Group>
      <Form.Group>
        <Form.Control
          name='info'
          placeholder='Label'
          value={info}
          onChange={onChange}
          type='text'
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          name='link'
          placeholder='Link'
          value={link}
          onChange={onChange}
          type='text'
        />
      </Form.Group>
      <Form.Group>
        <Row>
          <Col>
            <Form.Control
              name='lat'
              placeholder='Lat'
              value={lat}
              onChange={onChange}
              type='text'
            />
          </Col>
          <Col>
            <Form.Control
              name='lng'
              placeholder='Lng'
              value={lng}
              onChange={onChange}
              type='text'
            />
          </Col>
        </Row>
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
