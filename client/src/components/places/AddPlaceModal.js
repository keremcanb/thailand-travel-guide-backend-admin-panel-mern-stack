import React, { useState } from 'react';
import {
  Button,
  Icon,
  Modal,
  TextInput,
  Textarea,
  Row,
  Col
} from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import useResources from '../../utils/useResources';
import { addPlace } from '../../actions/place';

const AddPlaceModal = ({ addPlace }) => {
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
    lng: ''
  };
  const [place, setPlace] = useState(initialFormState);
  // const locations = useResources('locations');
  // const categories = useResources('categories');
  const {
    title,
    thumbnail,
    image,
    content,
    location,
    category,
    info,
    link,
    lat,
    lng
  } = place;

  const onSubmit = () => {
    addPlace(place);
    M.toast({ html: `Place added` });
    setPlace(initialFormState);
  };

  const onChange = (e) => {
    setPlace({ ...place, [e.target.id]: e.target.value });
  };

  return (
    <Modal
      id="add-place-modal"
      actions={[
        <Button onClick={onSubmit} node="button" waves="light" type="submit">
          Submit
          <Icon right>send</Icon>
        </Button>
      ]}
      trigger={
        <Button
          className="blue darken-2"
          fab
          floating
          large
          node="button"
          icon={<Icon>add</Icon>}
        />
      }
    >
      <TextInput
        id="title"
        label="Title"
        type="text"
        value={title}
        onChange={onChange}
      />
      <TextInput
        id="thumbnail"
        label="Thumbnail"
        type="text"
        value={thumbnail}
        onChange={onChange}
      />
      <TextInput
        id="image"
        label="Image"
        type="text"
        value={image}
        onChange={onChange}
      />
      <Textarea
        id="content"
        label="Content"
        type="text"
        value={content}
        onChange={onChange}
      />
      <Row>
        <Col m={6}>
          <TextInput
            id="location"
            label="Location"
            type="text"
            value={location}
            onChange={onChange}
          />
        </Col>
        <Col m={6}>
          <TextInput
            id="category"
            label="Category"
            type="text"
            value={category}
            onChange={onChange}
          />
        </Col>
      </Row>
      <TextInput
        id="info"
        label="Info"
        type="text"
        value={info}
        onChange={onChange}
      />
      <TextInput
        id="link"
        label="Link"
        type="text"
        value={link}
        onChange={onChange}
      />
      <Row>
        <Col m={6}>
          <TextInput
            id="lat"
            label="Lat"
            type="text"
            value={lat}
            onChange={onChange}
          />
        </Col>
        <Col m={6}>
          <TextInput
            id="lng"
            label="Lng"
            type="text"
            value={lng}
            onChange={onChange}
          />
        </Col>
      </Row>
    </Modal>
  );
};

AddPlaceModal.propTypes = {
  addPlace: PropTypes.func.isRequired
};

export default connect(null, { addPlace })(AddPlaceModal);
