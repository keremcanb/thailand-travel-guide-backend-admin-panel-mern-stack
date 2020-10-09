import React, { useState } from 'react';
import { TextInput, Row, Container } from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import { addCategory } from '../../actions/category';
import FileUpload from '../upload/FileUpload';
import useResources from '../../utils/useResources';

const AddCategory = ({ addCategory, history }) => {
  const initialFormState = { title: '', thumbnail: '', location: '' };
  const [category, setCategory] = useState(initialFormState);
  const { title, location } = category;
  const locations = useResources('locations');
  const animatedComponents = makeAnimated();
  const [submittedFileName, setSubmittedFileName] = useState('');

  const onChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const onSelect = (value, action) => {
    setCategory({ ...category, [action.name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      M.toast({ html: 'Please enter title' });
    } else if (!location) {
      M.toast({ html: 'Please enter location' });
    } else {
      addCategory({
        ...category,
        thumbnail: submittedFileName
      });
      M.toast({ html: `Category added` });
      setCategory(initialFormState);
      history.push('categories');
    }
  };

  return (
    <Container className="center mt form-container">
      <Row>
        <form onSubmit={onSubmit}>
          <Select
            id="add-cat-loc"
            name="location"
            placeholder="Location *"
            value={location}
            onChange={onSelect}
            components={animatedComponents}
            closeMenuOnSelect={false}
            isMulti
            options={locations.map((loc) => ({
              value: loc.title,
              label: loc.title
            }))}
          />
          <TextInput
            id="add-cat-title"
            name="title"
            placeholder="Title *"
            value={title}
            onChange={onChange}
            s={12}
          />
          <FileUpload updateFileNameToParent={setSubmittedFileName} />
        </form>
      </Row>
    </Container>
  );
};

AddCategory.propTypes = {
  addCategory: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
};

export default connect(null, { addCategory })(AddCategory);
