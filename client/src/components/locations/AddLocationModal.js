/* eslint-disable radix */
import React, { useState } from 'react';
import axios from 'axios';
import { Button, Icon, Modal, TextInput } from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLocation } from '../../actions/location';
import Message from '../layout/UploadMessage';

const AddLocationModal = ({ addLocation }) => {
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
    if (title === '') {
      M.toast({ html: 'Please enter location' });
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
      addLocation({
        ...location,
        thumbnail: filename
      });
      M.toast({ html: 'Location added' });
      setLocation(initialFormState);
    }
  };

  return (
    <Modal
      id="add-location-modal"
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
        id="add-loc-title"
        name="title"
        label="Title *"
        value={title}
        onChange={onChange}
      />
      {message && <Message msg={message} />}
      <TextInput
        id="add-loc-thumb"
        name="thumbnail"
        type="file"
        label={filename}
        onChange={onChangeFile}
        value={thumbnail}
      />
    </Modal>
  );
};

AddLocationModal.propTypes = {
  addLocation: PropTypes.func.isRequired
};

export default connect(null, { addLocation })(AddLocationModal);
