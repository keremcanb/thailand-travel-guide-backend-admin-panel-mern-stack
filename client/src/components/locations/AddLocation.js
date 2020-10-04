/* eslint-disable radix */
import React, { useState } from 'react';
import axios from 'axios';
import { Button, Icon, TextInput, Row, Container } from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLocation } from '../../actions/location';
import Message from '../layout/UploadMessage';

const AddLocation = ({ addLocation, history }) => {
  const initialFormState = { title: '', thumbnail: '' };
  const [location, setLocation] = useState(initialFormState);
  const { title, thumbnail } = location;
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Thumbnail');
  const [message, setMessage] = useState('');

  const onChange = (e) => {
    setLocation({ ...location, [e.target.name]: e.target.value });
  };

  const onChangeFile = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      M.toast({ html: 'Please enter title' });
      // } else if (!thumbnail) {
      //   M.toast({ html: 'Please enter thumbnail' });
    } else {
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
      addLocation({
        ...location,
        thumbnail: filename
      });
      M.toast({ html: 'Location added' });
      setLocation(initialFormState);
      history.push('locations');
    }
  };

  console.log(filename);

  return (
    <Container className="center mt form-container">
      <Row>
        <form onSubmit={onSubmit}>
          <TextInput
            id="add-loc-title"
            name="title"
            label="Title *"
            value={title}
            onChange={onChange}
            error="Enter title"
            s={12}
          />
          {message && <Message msg={message} />}
          <TextInput
            id="add-loc-thumb"
            name="thumbnail"
            type="file"
            label={filename}
            onChange={onChangeFile}
            value={thumbnail}
            s={12}
          />
          <Button
            variant="contained"
            className="blue darken-2 mb"
            type="submit"
          >
            Submit
            <Icon right>send</Icon>
          </Button>
        </form>
      </Row>
    </Container>
  );
};

AddLocation.propTypes = {
  addLocation: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
};

export default connect(null, { addLocation })(AddLocation);
