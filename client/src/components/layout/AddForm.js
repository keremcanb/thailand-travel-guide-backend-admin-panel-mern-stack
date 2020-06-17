import React, { useState } from 'react';
import { Container, Form, Col, Row } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import useResources from '../../utils/useResources';

const AddItem = ({ items, addItem }) => {
  const initialFormState = {
    title: '',
    image: '',
    thumbnail: '',
    content: '',
    location: '',
    category: '',
    info: '',
    link: '',
    lat: '',
    lng: '',
  };
  const [form, setForm] = useState(initialFormState);
  const locations = useResources('locations');
  const categories = useResources('categories');

  function onSubmit(e) {
    e.preventDefault();
    addItem();
  }

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <Container className='sticky-top'>
      <Form onSubmit={onSubmit}>
        {!items.title && (
          <Form.Group>
            <Form.Control
              name='title'
              placeholder='Title *'
              value={items.title}
              onChange={onChange}
              type='text'
              required
            />
            <Form.Control.Feedback type='invalid'>
              Please provide a valid title.
            </Form.Control.Feedback>
          </Form.Group>
        )}
        {!items.image && (
          <Form.Group>
            <Form.Control
              name='image'
              placeholder='Image *'
              value={items.image}
              onChange={onChange}
              type='text'
              required
            />
            <Form.Control.Feedback type='invalid'>
              Please provide a valid image.
            </Form.Control.Feedback>
          </Form.Group>
        )}
        {!items.thumbnail && (
          <Form.Group>
            <Form.Control
              name='thumbnail'
              placeholder='Thumbnail *'
              value={items.thumbnail}
              onChange={onChange}
              type='text'
              required
            />
            <Form.Control.Feedback type='invalid'>
              Please provide a valid thumbnail.
            </Form.Control.Feedback>
          </Form.Group>
        )}
        {!items.content && (
          <Form.Group>
            <Form.Control
              name='content'
              placeholder='Content *'
              value={items.content}
              onChange={onChange}
              as='textarea'
              rows='3'
              required
            />
            <Form.Control.Feedback type='invalid'>
              Please provide a valid content.
            </Form.Control.Feedback>
          </Form.Group>
        )}
        {!items.category && !items.location && (
          <Form.Group>
            <Row>
              <Col>
                <Form.Control
                  name='location'
                  onChange={onChange}
                  as='select'
                  required
                >
                  <option value=''>Location *</option>
                  {locations.map((loc) => (
                    <option value={loc.title} key={loc.title}>
                      {loc.title}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type='invalid'>
                  Please select a location..
                </Form.Control.Feedback>
              </Col>
              <Col>
                <Form.Control
                  name='category'
                  onChange={onChange}
                  as='select'
                  required
                >
                  <option value=''>Category *</option>
                  {categories.map((cat) => (
                    <option value={cat.title} key={cat.title}>
                      {cat.title}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type='invalid'>
                  Please select a category.
                </Form.Control.Feedback>
              </Col>
            </Row>
          </Form.Group>
        )}
        {items.info && (
          <Form.Group>
            <Form.Control
              name='info'
              placeholder='Info'
              value={items.info}
              onChange={onChange}
              type='text'
            />
            <Form.Control.Feedback type='invalid'>
              Please provide a valid info.
            </Form.Control.Feedback>
          </Form.Group>
        )}
        {items.link && (
          <Form.Group>
            <Form.Control
              name='link'
              placeholder='Link'
              value={items.link}
              onChange={onChange}
              type='text'
            />
            <Form.Control.Feedback type='invalid'>
              Please provide a valid link.
            </Form.Control.Feedback>
          </Form.Group>
        )}
        {items.lat && items.lng && (
          <Form.Group>
            <Row>
              <Col>
                <Form.Control
                  name='lat'
                  placeholder='Lat'
                  value={items.lat}
                  onChange={onChange}
                  type='text'
                />
              </Col>
              <Col>
                <Form.Control
                  name='lng'
                  placeholder='Lng'
                  value={items.lng}
                  onChange={onChange}
                  type='text'
                />
              </Col>
            </Row>
          </Form.Group>
        )}
        <Container className='d-flex justify-content-center mb-3'>
          <Button type='submit' variant='contained' color='primary'>
            Add
          </Button>
        </Container>
      </Form>
    </Container>
  );
};

export default AddItem;
