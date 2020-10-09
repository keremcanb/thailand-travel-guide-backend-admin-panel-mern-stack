import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TextInput, Row, Container } from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import { updateLocation } from '../../actions/location';
import FileUpload from '../upload/FileUpload';

const EditLocation = ({ current, updateLocation, history }) => {
  const [location, setLocation] = useState('');
  const { title, thumbnail } = location;
  const [submittedFileName, setSubmittedFileName] = useState('');

  useEffect(() => {
    if (current) {
      setLocation(current);
    }
  }, [current]);

  const onChange = (e) => {
    setLocation({ ...location, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    updateLocation({
      ...location,
      thumbnail: submittedFileName
    });
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
          <FileUpload updateFileNameToParent={setSubmittedFileName} />
          <Row>
            <img src={thumbnail} alt="" width="200" />
          </Row>
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
