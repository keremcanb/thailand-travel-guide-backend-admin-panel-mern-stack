/* eslint-disable import/extensions */
import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLocation } from '../../actions/location';

const AddLocationModal = ({ addLocation }) => {
  const initialFormState = { title: '', thumbnail: '' };
  const [location, setLocation] = useState(initialFormState);
  const { title, thumbnail } = location;

  const onSubmit = () => {
    if (title === '' || thumbnail === '') {
      M.toast({ html: 'Please enter location' });
    } else {
      addLocation(location);
      M.toast({ html: `Location added` });
      setLocation(initialFormState);
    }
  };

  const onChange = (e) => {
    setLocation({ ...location, [e.target.name]: e.target.value });
  };

  return (
    <Container
      id='add-location-modal'
      className='modal'
      // style={{ width: '70%', height: '60%', marginTop: '50px' }}
    >
      <div className='modal-content'>
        {/* <h4>Enter Location</h4> */}
        <Form>
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
              name='thumbnail'
              placeholder='Thumbnail *'
              value={thumbnail}
              onChange={onChange}
              type='text'
              required
            />
          </Form.Group>
        </Form>
      </div>

      <div className='modal-footer'>
        <a
          href='#!'
          onClick={onSubmit}
          className='modal-close waves-effect blue waves-light btn'
        >
          Enter
        </a>
      </div>
    </Container>
  );
};

AddLocationModal.propTypes = {
  addLocation: PropTypes.func.isRequired,
};

export default connect(null, { addLocation })(AddLocationModal);
