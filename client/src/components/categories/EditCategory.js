import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { TextInput, Row, Container } from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import { updateCategory } from '../../actions/category';
import useResources from '../../utils/useResources';
import FileUpload from '../upload/FileUpload';

const EditCategory = ({ history }) => {
  const [category, setCategory] = useState('');
  const { title, thumbnail, location } = category;

  const [submittedFileName, setSubmittedFileName] = useState('');

  const locations = useResources('locations');

  const animatedComponents = makeAnimated();

  const current = useSelector((state) => state.category.current);

  const dispatch = useDispatch();

  useEffect(() => {
    if (current) {
      setCategory(current);
    }
    document.title = 'Edit Category';
  }, [current]);

  const onChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const onSelect = (value, action) => {
    setCategory({ ...category, [action.name]: value });
  };

  const onSubmit = () => {
    dispatch(updateCategory({ ...category, thumbnail: submittedFileName }));
    M.toast({ html: `${title} updated` });
    history.push('categories');
  };

  return (
    <Container className="center mt form-container">
      <Row>
        <form onSubmit={onSubmit}>
          {location &&
            location.map((loc) => {
              return (
                <li style={{ display: 'inline' }} key={loc.value}>
                  {loc.label},{' '}
                </li>
              );
            })}
          <Select
            id="edit-cat-loc"
            name="locations"
            placeholder="Location"
            onChange={onSelect}
            components={animatedComponents}
            closeMenuOnSelect={false}
            isMulti
            // value={location}
            options={locations.map((loc) => ({
              value: loc.title,
              label: loc.title
            }))}
          />
          <TextInput
            id="edit-cat-title"
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

export default EditCategory;
