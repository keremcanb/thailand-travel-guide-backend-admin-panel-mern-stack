import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button,
  Icon,
  Modal,
  TextInput,
  Textarea,
  Select,
  Row,
  Col
} from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import useResources from '../../utils/useResources';
import { updatePlace } from '../../actions/place';

const EditPlaceModal = ({ current, updatePlace }) => {
  const [place, setPlace] = useState('');
  const locations = useResources('locations');
  const categories = useResources('categories');
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

  useEffect(() => {
    if (current) {
      setPlace(current);
    }
  }, [current]);

  const onChange = (e) => {
    setPlace({ ...place, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    updatePlace(place);
    M.toast({ html: 'Place updated' });
  };

  return (
    <Modal
      id="edit-place-modal"
      style={{
        height: '100%',
        width: '60%'
      }}
      actions={[
        <Button onClick={onSubmit} node="button" waves="light" type="submit">
          Update
          <Icon right>send</Icon>
        </Button>
      ]}
    >
      <TextInput
        id="edit-place-title"
        name="title"
        label="Title"
        value={title}
        onChange={onChange}
      />
      <TextInput
        id="edit-place-thumb"
        name="thumbnail"
        label="Thumbnail"
        value={thumbnail}
        onChange={onChange}
      />
      <TextInput
        id="edit-place-image"
        label="Image"
        value={image}
        onChange={onChange}
      />
      <Textarea
        id="edit-place-content"
        name="content"
        label="Content"
        value={content}
        onChange={onChange}
      />
      <Row>
        <Col m={6}>
          <Select
            id="edit-place-loc"
            name="location"
            label="Location"
            value={location}
            onChange={onChange}
          >
            {locations.map((loc) => (
              <option key={loc._id} value={loc.title}>
                {loc.title}
              </option>
            ))}
          </Select>
        </Col>
        <Col m={6}>
          <Select
            id="edit-place-cat"
            name="category"
            label="Category"
            value={category}
            onChange={onChange}
          >
            {categories.map((cat) => (
              <option key={cat._id} value={cat.title}>
                {cat.title}
              </option>
            ))}
          </Select>
        </Col>
      </Row>
      <TextInput
        id="edit-place-info"
        name="info"
        label="Info"
        value={info}
        onChange={onChange}
      />
      <TextInput
        id="edit-place-link"
        name="link"
        label="Link"
        value={link}
        onChange={onChange}
      />
      <Row>
        <Col m={6}>
          <TextInput
            id="edit-place-lat"
            name="lat"
            label="Lat"
            value={lat}
            onChange={onChange}
          />
        </Col>
        <Col m={6}>
          <TextInput
            id="edit-place-lng"
            name="lng"
            label="Lng"
            value={lng}
            onChange={onChange}
          />
        </Col>
      </Row>
    </Modal>
  );
};

EditPlaceModal.propTypes = {
  current: PropTypes.object,
  updatePlace: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  current: state.place.current
});

export default connect(mapStateToProps, { updatePlace })(EditPlaceModal);
