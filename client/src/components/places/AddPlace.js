import React, { useState } from 'react';
import { TextInput, Textarea, Select, Row, Container } from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import useResources from '../../utils/useResources';
import { addPlace } from '../../actions/place';
import FileUpload from '../upload/FileUpload';

const AddPlace = ({ addPlace, history }) => {
  const initialFormState = {
    title: '',
    image: '',
    thumbnail: '',
    content: '',
    location: '',
    category: '',
    info: '',
    link: '',
    lat: '',
    lng: ''
  };
  const [place, setPlace] = useState(initialFormState);
  const locations = useResources('locations');
  const categories = useResources('categories');
  const { title, content, location, category, info, link, lat, lng } = place;
  const [submittedFileName, setSubmittedFileName] = useState('');

  const onChange = (e) => {
    setPlace({ ...place, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      M.toast({ html: 'Please enter title' });
    } else if (!content) {
      M.toast({ html: 'Please enter content' });
    } else if (!category) {
      M.toast({ html: 'Please enter category' });
    } else if (!location) {
      M.toast({ html: 'Please enter location' });
    } else {
      addPlace({
        ...place,
        thumbnail: submittedFileName
      });
      M.toast({ html: `Place added` });
      setPlace(initialFormState);
      history.push('places');
    }
  };

  return (
    <Container className="center mt form-container">
      <Row>
        <form onSubmit={onSubmit}>
          <TextInput
            id="add-place-title"
            name="title"
            label="Title"
            value={title}
            onChange={onChange}
            s={12}
          />
          {/* <TextInput
            id="add-place-image"
            name="image"
            label="Image"
            value={image}
            onChange={onChange}
            s={12}
          /> */}
          <Textarea
            id="add-place-content"
            name="content"
            label="Content"
            value={content}
            onChange={onChange}
            s={12}
          />
          <Select
            id="add-place-loc"
            name="location"
            value={location}
            onChange={onChange}
            s={6}
          >
            <option disabled value="">
              Location
            </option>
            {locations.map((loc) => (
              <option key={loc._id} value={loc.title}>
                {loc.title}
              </option>
            ))}
          </Select>
          <Select
            id="add-place-cat"
            name="category"
            value={category}
            onChange={onChange}
            s={6}
          >
            <option disabled value="">
              Category
            </option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.title}>
                {cat.title}
              </option>
            ))}
          </Select>
          <TextInput
            id="add-place-info"
            name="info"
            label="Info"
            value={info}
            onChange={onChange}
            s={12}
          />
          <TextInput
            id="add-place-link"
            name="link"
            label="Link"
            value={link}
            onChange={onChange}
            s={12}
          />
          <TextInput
            id="add-place-lat"
            name="lat"
            label="Lat"
            value={lat}
            onChange={onChange}
            s={6}
          />
          <TextInput
            id="add-place-lng"
            name="lng"
            label="Lng"
            value={lng}
            onChange={onChange}
            s={6}
          />
          <FileUpload updateFileNameToParent={setSubmittedFileName} />
        </form>
      </Row>
    </Container>
  );
};

AddPlace.propTypes = {
  addPlace: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
};

export default connect(null, { addPlace })(AddPlace);
