import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput, Row, Container } from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import { updateLocation } from '../../actions/location';
import FileUpload from '../upload/FileUpload';

const EditLocation = ({ history }) => {
  const [location, setLocation] = useState('');
  const { title, thumbnail } = location;

  const [submittedFileName, setSubmittedFileName] = useState('');

  const current = useSelector((state) => state.location.current);

  const dispatch = useDispatch();

  useEffect(() => {
    if (current) {
      setLocation(current);
    }
    document.title = 'Edit Location';
  }, [current]);

  const onChange = (e) => {
    setLocation({ ...location, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
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

export default EditLocation;
