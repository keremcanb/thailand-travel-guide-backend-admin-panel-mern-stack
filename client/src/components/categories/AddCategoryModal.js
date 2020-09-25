import React, { useState } from 'react';
import { Button, Icon, Modal, TextInput } from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import { addCategory } from '../../actions/category';
import useResources from '../../utils/useResources';

const AddCategoryModal = ({ addCategory }) => {
  const initialFormState = { title: '', thumbnail: '', location: '' };
  const [category, setCategory] = useState(initialFormState);
  const { title, thumbnail } = category;
  const locations = useResources('locations');
  const animatedComponents = makeAnimated();

  const onSubmit = () => {
    if (title === '' || thumbnail === '' || locations) {
      M.toast({ html: 'Please enter category' });
    } else {
      addCategory(category);
      M.toast({ html: `Category added` });
      setCategory(initialFormState);
    }
  };

  const onChange = (e) => {
    setCategory({ ...category, [e.target.id]: e.target.value });
  };

  const onSelect = (value, action) => {
    setCategory({ ...category, [action.id]: value });
  };

  return (
    <Modal
      id="add-category-modal"
      actions={[
        <Button onClick={onSubmit} node="button" waves="light" type="submit">
          Submit
          <Icon right>send</Icon>
        </Button>
      ]}
      trigger={
        <Button
          className="blue darken-2"
          fab
          floating
          large
          node="button"
          icon={<Icon>add</Icon>}
        />
      }
    >
      <TextInput
        id="title"
        placeholder="Title *"
        value={title}
        onChange={onChange}
        type="text"
        required
      />
      <TextInput
        id="thumbnail"
        placeholder="Thumbnail *"
        value={thumbnail}
        onChange={onChange}
        type="text"
        required
      />
      <Select
        id="location"
        options={locations.map((loc) => ({
          value: loc.title,
          label: loc.title
        }))}
        onChange={onSelect}
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
      />
    </Modal>
  );
};

AddCategoryModal.propTypes = {
  addCategory: PropTypes.func.isRequired
};

export default connect(null, { addCategory })(AddCategoryModal);
