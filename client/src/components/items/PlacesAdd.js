import React, { useState } from 'react';
import { Container, Form, Col, Row } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import useResources from '../../utils/useResources';

const AddItem = ({ addItem }) => {
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
  const [item, setItem] = useState(initialFormState);
  const [itemAdded, setItemAdded] = useState(false);
  const { title, image, thumbnail, content, info, link, lat, lng } = item;
  const locations = useResources('locations');
  const categories = useResources('categories');

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
            value={title}
            onChange={onChange}
            type='text'
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            name='image'
            placeholder='Image *'
            value={image}
            onChange={onChange}
            type='text'
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            name='thumbnail'
            placeholder='Thumbnail *'
            value={thumbnail}
            onChange={onChange}
            type='text'
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            name='content'
            placeholder='Content *'
            value={content}
            onChange={onChange}
            as='textarea'
            rows='3'
            required
          />
        </Form.Group>
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
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Form.Control
            name='info'
            placeholder='Info'
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
          <Form.Control.Feedback type='invalid'>
            Please provide a valid link.
          </Form.Control.Feedback>
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
          <h5>Place added</h5>
        </Container>
      )}
    </>
  );
};

export default AddItem;
