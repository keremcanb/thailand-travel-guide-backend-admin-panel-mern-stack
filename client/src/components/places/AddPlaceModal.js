import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPlace } from '../../actions/place';

const AddPlaceModal = ({ addPlace }) => {
  const initialFormState = { title: '', thumbnail: '' };
  const [place, setPlace] = useState(initialFormState);
  const { title, thumbnail } = place;

  const onSubmit = () => {
    if (title === '' || thumbnail === '') {
      M.toast({ html: 'Please enter place' });
    } else {
      addPlace(place);
      M.toast({ html: `Place added` });
      setPlace(initialFormState);
    }
  };

  const onChange = (e) => {
    setPlace({ ...place, [e.target.name]: e.target.value });
  };

  return (
    <Container
      id="add-place-modal"
      className="modal"
      // style={{ width: '70%', height: '60%', marginTop: '50px' }}
    >
      <div className="modal-content">
        {/* <h4>Enter Place</h4> */}
        <Form>
          <Form.Group>
            <Form.Control
              name="title"
              placeholder="Title *"
              value={title}
              onChange={onChange}
              type="text"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              name="thumbnail"
              placeholder="Thumbnail *"
              value={thumbnail}
              onChange={onChange}
              type="text"
              required
            />
          </Form.Group>
        </Form>
      </div>

      <div className="modal-footer">
        <a
          href="#!"
          onClick={onSubmit}
          className="modal-close waves-effect blue waves-light btn"
        >
          Enter
        </a>
      </div>
    </Container>
  );
};

AddPlaceModal.propTypes = {
  addPlace: PropTypes.func.isRequired
};

export default connect(null, { addPlace })(AddPlaceModal);
