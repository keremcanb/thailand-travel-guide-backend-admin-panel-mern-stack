import React, { useState } from 'react';
import { Button, Icon, Modal, TextInput } from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import makeAnimated from 'react-select/animated';
// import Select from 'react-select';
import Dropzone from 'react-dropzone-uploader';
import { addCategory } from '../../actions/category';
// import useResources from '../../utils/useResources';
import 'react-dropzone-uploader/dist/styles.css';

const AddCategoryModal = ({ addCategory }) => {
  const initialFormState = { title: '', thumbnail: '', location: '' };
  const [category, setCategory] = useState(initialFormState);
  const { title, thumbnail } = category;
  // const locations = useResources('locations');
  // const animatedComponents = makeAnimated();

  const onSubmit = () => {
    // if (title === '' || thumbnail === '') {
    //   M.toast({ html: 'Please enter category' });
    // } else {
    //   addCategory(category);
    //   M.toast({ html: `Category added` });
    //   setCategory(initialFormState);
    // }
    addCategory(category);
    M.toast({ html: `Category added` });
    setCategory(initialFormState);
  };

  const onChange = (e) => {
    setCategory({ ...category, [e.target.id]: e.target.value });
  };

  // const onSelect = (value, action) => {
  //   setCategory({ ...category, [action.id]: value });
  // };

  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => {
    return { url: '/upload' };
  };

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, meta, file);
  };

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    console.log(files.map((f) => f.meta));
    allFiles.forEach((f) => f.remove());
  };

  return (
    <Modal
      id="add-category-modal"
      style={{
        height: '100%',
        width: '60%'
      }}
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
          waves="light"
          icon={<Icon>add</Icon>}
        />
      }
    >
      <TextInput
        id="title"
        placeholder="Title *"
        value={title}
        onChange={onChange}
      />
      {/* <TextInput
        id="thumbnail"
        placeholder="Thumbnail *"
        value={thumbnail}
        onChange={onChange}
      /> */}
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        accept="image/*,audio/*,video/*"
        submitButtonDisabled="true"
      />
      {/* <Select
        id="location"
        options={locations.map((loc) => ({
          value: loc.title,
          label: loc.title
        }))}
        onChange={onSelect}
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
      /> */}
    </Modal>
  );
};

AddCategoryModal.propTypes = {
  addCategory: PropTypes.func.isRequired
};

export default connect(null, { addCategory })(AddCategoryModal);
