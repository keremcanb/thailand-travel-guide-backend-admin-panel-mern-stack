import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { TextInput, Textarea, Select, Row, Container } from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import { updatePlace } from '../../store/actions/place';
import useResources from '../../utils/useResources';
import FileUpload from '../../components/upload/FileUpload';

const EditPlace = ({ history }) => {
  const [place, setPlace] = useState('');
  const { title, thumbnail, content, location, category, info, link, lat, lng } = place;
  const [submittedFileName, setSubmittedFileName] = useState('');
  const locations = useResources('locations');
  const categories = useResources('categories');
  const dispatch = useDispatch();
  const current = useSelector((state) => state.place.current);

  useEffect(() => {
    if (current) {
      setPlace(current);
    }
  }, [current]);

  const onChangeHandler = (e) => {
    setPlace({ ...place, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = () => {
    dispatch(updatePlace({ ...place, thumbnail: submittedFileName }));
    M.toast({ html: `${title} updated` });
    history.push('places');
  };

  return (
    <>
      <Helmet>
        <title>Edit Place</title>
      </Helmet>
      <Container className="center mt form-container">
        <Row>
          <form onSubmit={onSubmitHandler}>
            <TextInput
              id="edit-place-title"
              name="title"
              label="Title"
              value={title}
              onChange={onChangeHandler}
              s={12}
            />
            <Textarea
              id="edit-place-content"
              name="content"
              label="Content"
              value={content}
              onChange={onChangeHandler}
              s={12}
            />
            <Select
              id="edit-place-loc"
              name="location"
              label="Location"
              value={location}
              onChange={onChangeHandler}
              s={6}
            >
              {locations.map((loc) => (
                <option key={loc._id} value={loc.title}>
                  {loc.title}
                </option>
              ))}
            </Select>
            <Select
              id="edit-place-cat"
              name="category"
              label="Category"
              value={category}
              onChange={onChangeHandler}
              s={6}
            >
              {categories.map((cat) => (
                <option key={cat._id} value={cat.title}>
                  {cat.title}
                </option>
              ))}
            </Select>
            <TextInput id="edit-place-info" name="info" label="Info" value={info} onChange={onChangeHandler} s={12} />
            <TextInput id="edit-place-link" name="link" label="Link" value={link} onChange={onChangeHandler} s={12} />
            <TextInput id="edit-place-lat" name="lat" label="Lat" value={lat} onChange={onChangeHandler} s={6} />
            <TextInput id="edit-place-lng" name="lng" label="Lng" value={lng} onChange={onChangeHandler} s={6} />
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

export default EditPlace;
