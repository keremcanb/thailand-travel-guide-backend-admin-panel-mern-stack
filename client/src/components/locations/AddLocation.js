import React, { useState } from 'react';
import { TextInput, Row, Container } from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLocation } from '../../actions/location';
import FileUpload from '../upload/FileUpload';

const AddLocation = ({ addLocation, history }) => {
  const initialFormState = { title: '', thumbnail: '' };
  const [location, setLocation] = useState(initialFormState);
  const { title } = location;
  const [submittedFileName, setSubmittedFileName] = useState('');

  const onChange = (e) => {
    setLocation({ ...location, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    if (!title) {
      M.toast({ html: 'Please enter title' });
    } else {
      addLocation({
        ...location,
        thumbnail: submittedFileName
      });
      M.toast({ html: 'Location added' });
      setLocation(initialFormState);
      history.push('locations');
    }
  };

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
          <FileUpload updateFileNameToParent={setSubmittedFileName} />
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
