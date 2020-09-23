import React, { useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import { addCategory } from '../../actions/category';
import useResources from '../../utils/useResources';

const AddCategoryModal = ({ addCategory }) => {
  const initialFormState = { title: '', thumbnail: '' };
  const [category, setCategory] = useState(initialFormState);
  const { title, thumbnail, location } = category;
  const animatedComponents = makeAnimated();
  const locations = useResources('locations');

  const onSubmit = () => {
    if (title === '' || thumbnail === '' || location === '') {
      M.toast({ html: 'Please enter category' });
    } else {
      addCategory(category);
      M.toast({ html: `Category added` });
      setCategory(initialFormState);
    }
  };

  const onChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  function onSelect(value, action) {
    setCategory({ ...category, [action.name]: value });
  }

  return (
    <div
      id="add-category-modal"
      className="modal"
      // style={{ width: '100%', height: '100%' }}
    >
      <div className="modal-content">
        {/* <h4>Enter Category</h4> */}

        <Form.Group>
          <Form.Control
            name="title"
            placeholder="Title *"
            value={category.title}
            onChange={onChange}
            type="text"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            name="thumbnail"
            placeholder="Thumbnail *"
            value={category.thumbnail}
            onChange={onChange}
            type="text"
            required
          />
        </Form.Group>
        <Form.Group>
          <Select
            name="location"
            options={locations.map((loc) => ({
              value: loc.title,
              label: loc.title
            }))}
            onChange={onSelect}
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
          />
        </Form.Group>
      </div>

      <div className="modal-footer">
        <a
          href="#!"
          onClick={onSubmit}
          className="modal-close waves-effect blue waves-light btn"
        >
          Enter
        </a>
      </div>
    </div>
  );
};

AddCategoryModal.propTypes = {
  addCategory: PropTypes.func.isRequired
};

export default connect(null, { addCategory })(AddCategoryModal);
