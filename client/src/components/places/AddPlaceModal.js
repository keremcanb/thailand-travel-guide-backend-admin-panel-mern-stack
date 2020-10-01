import React, { useState } from 'react';
import axios from 'axios';
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
import Message from '../layout/UploadMessage';

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
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Thumbnail');
  const [message, setMessage] = useState('');

  const onChange = (e) => {
    setPlace({ ...place, [e.target.name]: e.target.value });
  };

  const onChangeFile = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    if (title === '') {
      M.toast({ html: 'Please enter place' });
    } else {
      e.preventDefault();
      const formData = new FormData();
      formData.append('file', file);
      try {
        await axios.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } catch (err) {
        if (err.response.status === 500) {
          setMessage('There was a problem with the server');
        } else {
          setMessage(err.response.data.msg);
        }
      }
      addPlace({
        ...place,
        thumbnail: filename
      });
      M.toast({ html: `Place added` });
      setPlace(initialFormState);
    }
  };

  return (
    <Modal
      style={{
        height: '100%',
        width: '60%'
      }}
      id="add-place-modal"
      actions={[
        <Button onClick={onSubmit} node="button" type="submit">
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
        id="add-place-title"
        name="title"
        label="Title"
        value={title}
        onChange={onChange}
      />
      {message && <Message msg={message} />}
      <TextInput
        id="add-place-thumb"
        name="thumbnail"
        type="file"
        label={filename}
        value={thumbnail}
        onChange={onChangeFile}
      />
      <TextInput
        id="add-place-image"
        name="image"
        label="Image"
        value={image}
        onChange={onChange}
      />
      <Textarea
        id="add-place-content"
        name="content"
        label="Content"
        value={content}
        onChange={onChange}
      />
      <Row>
        <Col m={6}>
          <Select
            id="add-place-loc"
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
            id="add-place-cat"
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
        id="add-place-info"
        name="info"
        label="Info"
        value={info}
        onChange={onChange}
      />
      <TextInput
        id="add-place-link"
        name="link"
        label="Link"
        value={link}
        onChange={onChange}
      />
      <Row>
        <Col m={6}>
          <TextInput
            id="add-place-lat"
            name="lat"
            label="Lat"
            value={lat}
            onChange={onChange}
          />
        </Col>
        <Col m={6}>
          <TextInput
            id="add-place-lng"
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
