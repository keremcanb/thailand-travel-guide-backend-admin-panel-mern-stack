import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { TextInput, Row, Container } from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import { updateLocation } from '../../store/actions/location';
import FileUpload from '../../components/upload/FileUpload';

const EditLocation = ({ history }) => {
  const [location, setLocation] = useState('');
  const { title, thumbnail } = location;
  const [submittedFileName, setSubmittedFileName] = useState('');
  const dispatch = useDispatch();
  const current = useSelector((state) => state.location.current);

  useEffect(() => {
    if (current) {
      setLocation(current);
    }
  }, [current]);

  const onChangeHandler = (e) => {
    setLocation({ ...location, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async () => {
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
    <>
      <Helmet>
        <title>Edit Location</title>
      </Helmet>
      <Container className="center mt form-container">
        <Row>
          <form onSubmit={onSubmitHandler}>
            <TextInput id="edit-loc-title" name="title" label="Title" value={title} onChange={onChangeHandler} s={12} />
            <Row>
              <img src={thumbnail} alt="" width="200" />
            </Row>
            <FileUpload updateFileNameToParent={setSubmittedFileName} />
          </form>
        </Row>
      </Container>
    </>
  );
};

export default EditLocation;
