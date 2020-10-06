import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Icon, TextInput, Row, Container } from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import { updateLocation } from '../../actions/location';
import Message from '../layout/UploadMessage';

const EditLocation = ({ current, updateLocation, history }) => {
  const [location, setLocation] = useState('');
  const { title, thumbnail } = location;
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Thumbnail');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (current) {
      setLocation(current);
    }
  }, [current]);

  const onChange = (e) => {
    setLocation({ ...location, [e.target.name]: e.target.value });
  };

  const onChangeFile = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
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
    updateLocation({
      ...location,
      thumbnail: filename
    });
    // updateLocation(location);
    M.toast({ html: 'Location updated' });
    history.push('locations');
  };

  return (
    <Container className="center mt form-container">
      <Row>
        <form onSubmit={onSubmit}>
          <TextInput
            id="edit-loc-title"
            name="title"
            label="Title"
            value={title}
            onChange={onChange}
            s={12}
          />
          {message && <Message msg={message} />}
          <TextInput
            id="edit-loc-thumb"
            name="thumbnail"
            type="file"
            label="Thumbnail"
            onChange={onChangeFile}
            s={12}
          />
          <Row>
            <img src={thumbnail} alt="" width="200" />
          </Row>
          <Button variant="contained" className="blue darken-2" type="submit">
            Update
            <Icon right>update</Icon>
          </Button>
        </form>
      </Row>
    </Container>
  );
};

EditLocation.propTypes = {
  current: PropTypes.object.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  updateLocation: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  current: state.location.current
});

export default connect(mapStateToProps, { updateLocation })(EditLocation);
