import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Icon, Modal, TextInput } from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import useResources from '../../utils/useResources';
import { updateCategory } from '../../actions/category';

const EditCategoryModal = ({ current, updateCategory }) => {
  const [category, setCategory] = useState('');
  const { title, thumbnail, location } = category;
  const locations = useResources('locations');
  const animatedComponents = makeAnimated();

  useEffect(() => {
    if (current) {
      setCategory(current);
    }
  }, [current]);

  const onChange = (e) => {
    setCategory({ ...category, [e.target.id]: e.target.value });
  };

  const onSelect = (value, action) => {
    setCategory({ ...category, [action.name]: value });
  };

  const onSubmit = () => {
    updateCategory(category);
    M.toast({ html: 'Category updated' });
  };

  return (
    <Modal
      id="edit-category-modal"
      actions={[
        <Button onClick={onSubmit} node="button" waves="light" type="submit">
          Submit
          <Icon right>send</Icon>
        </Button>
      ]}
    >
      <TextInput
        id="title"
        label="Title"
        type="text"
        value={title}
        onChange={onChange}
      />
      <TextInput
        id="thumbnail"
        label="Thumbnail"
        type="text"
        value={thumbnail}
        onChange={onChange}
      />
      <Select
        name="locations"
        options={locations.map((loc) => ({
          value: loc.title,
          label: loc.title
        }))}
        value={location}
        onChange={onSelect}
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
      />
    </Modal>
  );
};

EditCategoryModal.propTypes = {
  current: PropTypes.object,
  updateCategory: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  current: state.category.current
});

export default connect(mapStateToProps, { updateCategory })(EditCategoryModal);
