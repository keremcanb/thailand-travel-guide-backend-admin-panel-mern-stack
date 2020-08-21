import React, { useState } from 'react';
import { Container, Form, Col, Row } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
// import useResources from '../../utils/useResources';

const AddItem = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [image, setImage] = useState('');
  // const [content, setContent] = useState('');
  // const [location, setLocation] = useState('');
  // const [category, setCategory] = useState('');
  // const [info, setInfo] = useState('');
  // const [link, setLink] = useState('');
  // const [lat, setLat] = useState('');
  // const [lng, setLng] = useState('');

  // const locations = useResources('locations');
  // const categories = useResources('categories');

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Control
            name='title'
            placeholder='Title *'
            value={title}
            onChange={setTitle}
            type='text'
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            name='thumbnail'
            placeholder='Thumbnail *'
            value={thumbnail}
            onChange={setThumbnail}
            type='text'
            required
          />
        </Form.Group>
        {!!image && (
          <Form.Group>
            <Form.Control
              name='image'
              placeholder='Image *'
              value={image}
              onChange={setImage}
              type='text'
              required
            />
          </Form.Group>
        )}
        {/* <Form.Group>
          <Form.Control
            name='content'
            placeholder='Content *'
            value={content}
            onChange={setContent}
            as='textarea'
            rows='3'
            required
          />
        </Form.Group> */}
        {/* <Form.Group>
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
        </Form.Group> */}
        {/* <Form.Group>
          <Form.Control
            name='info'
            placeholder='Info'
            value={info}
            onChange={setInfo}
            type='text'
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            name='link'
            placeholder='Link'
            value={link}
            onChange={setLink}
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
                onChange={setLat}
                type='text'
              />
            </Col>
            <Col>
              <Form.Control
                name='lng'
                placeholder='Lng'
                value={lng}
                onChange={setLng}
                type='text'
              />
            </Col>
          </Row>
        </Form.Group> */}
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
      {/* {itemAdded && (
        <Container className='d-flex justify-content-center mt-2'>
          <h5>Place added</h5>
        </Container>
      )} */}
    </>
  );
};

export default AddItem;
