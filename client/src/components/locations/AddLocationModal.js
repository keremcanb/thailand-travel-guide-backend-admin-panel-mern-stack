/* eslint-disable radix */
import React, { useState } from 'react';
import axios from 'axios';
import { Button, Icon, Modal, TextInput, Row, Col } from 'react-materialize';
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
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');

  const onSubmit = async (e) => {
    if (title === '') {
      M.toast({ html: 'Please enter location' });
    } else {
      e.preventDefault();
      const formData = new FormData();
      formData.append('file', file);
      try {
        const res = await axios.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        const { fileName, filePath } = res.data;
        setUploadedFile({ fileName, filePath });
      } catch (err) {
        if (err.response.status === 500) {
          setMessage('There was a problem with the server');
        } else {
          setMessage(err.response.data.msg);
        }
      }
      addLocation(location);
      M.toast({ html: 'Location added' });
      setLocation(initialFormState);
    }
  };

  const onChange = (e) => {
    setLocation({ ...location, [e.target.name]: e.target.value });
  };

  const onChangeFile = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  return (
    <Modal
      id="add-location-modal"
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
        id="add-loc-title"
        name="title"
        label="Title *"
        value={title}
        onChange={onChange}
      />
      {message ? <Message msg={message} /> : null}
      <TextInput
        id="add-loc-thumb"
        name="thumbnail"
        type="file"
        label={filename}
        onChange={onChangeFile}
        value={thumbnail}
      />
      {/* <TextInput
        id="thumbnail"
        label="Thumbnail *"
        value={thumbnail}
        onChange={onChange}
      /> */}
      {uploadedFile && (
        <Row>
          <Col className="center">
            <p>{uploadedFile.fileName}</p>
            <img
              style={{ width: '20%' }}
              src={uploadedFile.filePath}
              alt={uploadedFile.fileName}
            />
          </Col>
        </Row>
      )}
    </Modal>
  );
};

AddLocationModal.propTypes = {
  addLocation: PropTypes.func.isRequired
};

export default connect(null, { addLocation })(AddLocationModal);
