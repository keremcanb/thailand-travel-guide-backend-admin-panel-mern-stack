import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TextInput, Row, Container } from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import { addLocation } from '../../actions/location';
import FileUpload from '../upload/FileUpload';

const AddLocation = ({ history }) => {
  const [location, setLocation] = useState({ title: '', thumbnail: '' });
  const { title } = location;

  const [submittedFileName, setSubmittedFileName] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Add Location';
  }, []);

  const onChange = (e) => {
    setLocation({ ...location, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    if (!title) {
      M.toast({ html: 'Please enter title' });
    } else {
      dispatch(
        addLocation({
          ...location,
          thumbnail: submittedFileName
        })
      );
      M.toast({ html: `${title} added` });
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

export default AddLocation;
