import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput, Textarea, Select, Row, Container } from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import { updatePlace } from '../../actions/place';
import useResources from '../../utils/useResources';
import FileUpload from '../upload/FileUpload';

const EditPlace = ({ history }) => {
  const [place, setPlace] = useState('');
  const {
    title,
    thumbnail,
    content,
    location,
    category,
    info,
    link,
    lat,
    lng
  } = place;

  const [submittedFileName, setSubmittedFileName] = useState('');

  const current = useSelector((state) => state.place.current);

  const locations = useResources('locations');
  const categories = useResources('categories');

  const dispatch = useDispatch();

  useEffect(() => {
    if (current) {
      setPlace(current);
    }
    document.title = 'Edit Place';
  }, [current]);

  const onChange = (e) => {
    setPlace({ ...place, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    dispatch(updatePlace({ ...place, thumbnail: submittedFileName }));
    M.toast({ html: `${title} updated` });
    history.push('places');
  };

  return (
    <Container className="center mt form-container">
      <Row>
        <form onSubmit={onSubmit}>
          <TextInput
            id="edit-place-title"
            name="title"
            label="Title"
            value={title}
            onChange={onChange}
            s={12}
          />
          <Textarea
            id="edit-place-content"
            name="content"
            label="Content"
            value={content}
            onChange={onChange}
            s={12}
          />
          <Select
            id="edit-place-loc"
            name="location"
            label="Location"
            value={location}
            onChange={onChange}
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
            onChange={onChange}
            s={6}
          >
            {categories.map((cat) => (
              <option key={cat._id} value={cat.title}>
                {cat.title}
              </option>
            ))}
          </Select>
          <TextInput
            id="edit-place-info"
            name="info"
            label="Info"
            value={info}
            onChange={onChange}
            s={12}
          />
          <TextInput
            id="edit-place-link"
            name="link"
            label="Link"
            value={link}
            onChange={onChange}
            s={12}
          />
          <TextInput
            id="edit-place-lat"
            name="lat"
            label="Lat"
            value={lat}
            onChange={onChange}
            s={6}
          />
          <TextInput
            id="edit-place-lng"
            name="lng"
            label="Lng"
            value={lng}
            onChange={onChange}
            s={6}
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

export default EditPlace;
