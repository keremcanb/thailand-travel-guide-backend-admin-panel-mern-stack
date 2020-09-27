/* eslint-disable radix */
import React, { useState } from 'react';
import axios from 'axios';
import { Button, Icon, Modal, TextInput, Row, Col } from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLocation } from '../../actions/location';
import Message from '../upload/Message';
import Progress from '../upload/Progress';

const AddLocationModal = ({ addLocation }) => {
  const initialFormState = { title: '', thumbnail: '' };
  const [location, setLocation] = useState(initialFormState);
  const { title, thumbnail } = location;

  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onSubmit = async (e) => {
    // if (title === '' || thumbnail === '') {
    //   M.toast({ html: 'Please enter location' });
    // } else {
    //   addLocation(location);
    //   M.toast({ html: `Location added` });
    //   setLocation(initialFormState);
    // }
    e.preventDefault();
    addLocation(location);

    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
          // Clear percentage
          setTimeout(() => setUploadPercentage(0), 10000);
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

    M.toast({ html: `Location added` });
    setLocation(initialFormState);
  };

  const onChange = (e) => {
    setLocation({ ...location, [e.target.id]: e.target.value });
  };

  function onChangeFile(e) {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  }

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
      <TextInput id="title" label="Title *" value={title} onChange={onChange} />

      <>
        {message ? <Message msg={message} /> : null}

        <TextInput
          type="file"
          id="custom-file"
          name="thumbnail"
          label={filename}
          onChange={onChangeFile}
          value={thumbnail}
        />

        <Progress percentage={uploadPercentage} />

        {uploadedFile ? (
          <Row>
            <Col className="center">
              <h6 className="text-center">{uploadedFile.fileName}</h6>
              <img
                style={{ width: '20%' }}
                src={uploadedFile.filePath}
                alt={uploadedFile.fileName}
              />
            </Col>
          </Row>
        ) : null}
      </>

      {/* <TextInput
        id="thumbnail"
        label="Thumbnail *"
        value={thumbnail}
        onChange={onChange}
      /> */}
    </Modal>
  );
};

AddLocationModal.propTypes = {
  addLocation: PropTypes.func.isRequired
};

export default connect(null, { addLocation })(AddLocationModal);
