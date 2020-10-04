import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button,
  Icon,
  TextInput,
  Textarea,
  Select,
  Row,
  Container
} from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import useResources from '../../utils/useResources';
import { updatePlace } from '../../actions/place';

const EditPlace = ({ current, updatePlace, history }) => {
  const [place, setPlace] = useState('');
  const locations = useResources('locations');
  const categories = useResources('categories');
  const {
    title,
    thumbnail,
    image,
    content,
    location,
    category,
    info,
    link,
    lat,
    lng
  } = place;

  useEffect(() => {
    if (current) {
      setPlace(current);
    }
  }, [current]);

  const onChange = (e) => {
    setPlace({ ...place, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    updatePlace(place);
    M.toast({ html: 'Place updated' });
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

          <TextInput
            id="edit-place-thumb"
            name="thumbnail"
            label="Thumbnail"
            value={thumbnail}
            onChange={onChange}
            s={12}
          />
          <TextInput
            id="edit-place-image"
            label="Image"
            value={image}
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
          <Button
            variant="contained"
            className="blue darken-2 mb"
            type="submit"
          >
            Update
            <Icon right>send</Icon>
          </Button>
        </form>
      </Row>
    </Container>
  );
};

EditPlace.propTypes = {
  current: PropTypes.object.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  updatePlace: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  current: state.place.current
});

export default connect(mapStateToProps, { updatePlace })(EditPlace);
