import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { TextInput, Textarea, Select, Row, Container } from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import { addPlace } from '../../store/actions/place';
import FileUpload from '../../components/upload/FileUpload';
import useResources from '../../utils/useResources';

const AddPlace = ({ history }) => {
  const [place, setPlace] = useState({
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
  });
  const { title, content, location, category, info, link, lat, lng } = place;
  const [submittedFileName, setSubmittedFileName] = useState('');
  const locations = useResources('locations');
  const categories = useResources('categories');
  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    setPlace({ ...place, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async () => {
    if (!title) {
      M.toast({ html: 'Please enter title' });
    } else if (!content) {
      M.toast({ html: 'Please enter content' });
    } else if (!category) {
      M.toast({ html: 'Please enter category' });
    } else if (!location) {
      M.toast({ html: 'Please enter location' });
    } else {
      dispatch(
        addPlace({
          ...place,
          thumbnail: submittedFileName
        })
      );
      M.toast({ html: `${title} added` });
      history.push('places');
    }
  };

  return (
    <>
      <Helmet>
        <title>Add Place</title>
      </Helmet>
      <Container className="center mt form-container">
        <Row>
          <form onSubmit={onSubmitHandler}>
            <TextInput
              id="add-place-title"
              name="title"
              label="Title"
              value={title}
              onChange={onChangeHandler}
              s={12}
            />
            {/* <TextInput
              id="add-place-image"
              name="image"
              label="Image"
              value={image}
              onChange={onChangeHandler}
              s={12}
            /> */}
            <Textarea
              id="add-place-content"
              name="content"
              label="Content"
              value={content}
              onChange={onChangeHandler}
              s={12}
            />
            <Select id="add-place-loc" name="location" value={location} onChange={onChangeHandler} s={6}>
              <option disabled value="">
                Location
              </option>
              {locations.map((loc) => (
                <option key={loc._id} value={loc.title}>
                  {loc.title}
                </option>
              ))}
            </Select>
            <Select id="add-place-cat" name="category" value={category} onChange={onChangeHandler} s={6}>
              <option disabled value="">
                Category
              </option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.title}>
                  {cat.title}
                </option>
              ))}
            </Select>
            <TextInput id="add-place-info" name="info" label="Info" value={info} onChange={onChangeHandler} s={12} />
            <TextInput id="add-place-link" name="link" label="Link" value={link} onChange={onChangeHandler} s={12} />
            <TextInput id="add-place-lat" name="lat" label="Lat" value={lat} onChange={onChangeHandler} s={6} />
            <TextInput id="add-place-lng" name="lng" label="Lng" value={lng} onChange={onChangeHandler} s={6} />
            <FileUpload updateFileNameToParent={setSubmittedFileName} />
          </form>
        </Row>
      </Container>
    </>
  );
};

export default AddPlace;
