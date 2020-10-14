import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { TextInput, Row, Container } from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import { updateLocation } from '../../actions/location';
import FileUpload from '../upload/FileUpload';

const EditLocation = ({ history }) => {
  const dispatch = useDispatch();

  const current = useSelector((state) => state.location.current);

  const [location, setLocation] = useState('');
  const { title, thumbnail } = location;

  const [submittedFileName, setSubmittedFileName] = useState('');

  useEffect(() => {
    if (current) {
      setLocation(current);
    }
    document.title = 'Edit Location';
  }, [current]);

  const onChange = (e) => {
    setLocation({ ...location, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      updateLocation({
        ...location,
        thumbnail: submittedFileName
      })
    );
    M.toast({ html: `${title} updated` });
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
          <Row>
            <img src={thumbnail} alt="" width="200" />
          </Row>
          <FileUpload updateFileNameToParent={setSubmittedFileName} />
        </form>
      </Row>
    </Container>
  );
};

EditLocation.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
};

export default EditLocation;
