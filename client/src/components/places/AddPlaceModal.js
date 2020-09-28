import React, { useState } from 'react';
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
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import useResources from '../../utils/useResources';
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

  const onSubmit = () => {
    if (title === '' || thumbnail === '' || image === '' || content === '') {
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
    <Modal
      style={{
        height: '100%',
        width: '60%'
      }}
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
          waves="light"
          icon={<Icon>add</Icon>}
        />
      }
    >
      <TextInput
        id="title"
        name="title"
        label="Title"
        value={title}
        onChange={onChange}
      />
      <TextInput
        id="thumbnail"
        name="thumbnail"
        label="Thumbnail"
        value={thumbnail}
        onChange={onChange}
      />
      <TextInput id="image" label="Image" value={image} onChange={onChange} />
      <Textarea
        id="content"
        name="content"
        label="Content"
        value={content}
        onChange={onChange}
      />
      <Row>
        <Col m={6}>
          <Select
            id="location"
            name="location"
            value={location}
            onChange={onChange}
          >
            <option disabled value="">
              Location
            </option>
            {locations.map((loc) => (
              <option key={loc._id} value={loc.title}>
                {loc.title}
              </option>
            ))}
          </Select>
        </Col>
        <Col m={6}>
          <Select
            id="category"
            name="category"
            value={category}
            onChange={onChange}
          >
            <option disabled value="">
              Category
            </option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.title}>
                {cat.title}
              </option>
            ))}
          </Select>
        </Col>
      </Row>
      <TextInput
        id="info"
        name="info"
        label="Info"
        value={info}
        onChange={onChange}
      />
      <TextInput
        id="link"
        name="link"
        label="Link"
        value={link}
        onChange={onChange}
      />
      <Row>
        <Col m={6}>
          <TextInput
            id="lat"
            name="lat"
            label="Lat"
            value={lat}
            onChange={onChange}
          />
        </Col>
        <Col m={6}>
          <TextInput
            id="lng"
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

AddPlaceModal.propTypes = {
  addPlace: PropTypes.func.isRequired
};

export default connect(null, { addPlace })(AddPlaceModal);
