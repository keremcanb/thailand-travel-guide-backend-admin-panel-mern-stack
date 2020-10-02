import React, { useState } from 'react';
import axios from 'axios';
import { Button, Icon, TextInput, Row } from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import { addCategory } from '../../actions/category';
import Message from '../layout/UploadMessage';
import useResources from '../../utils/useResources';

const AddCategory = ({ addCategory, history }) => {
  const initialFormState = { title: '', thumbnail: '', location: '' };
  const [category, setCategory] = useState(initialFormState);
  const { title, thumbnail, location } = category;
  const locations = useResources('locations');
  const animatedComponents = makeAnimated();
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Thumbnail');
  const [message, setMessage] = useState('');

  const onChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const onChangeFile = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSelect = (value, action) => {
    setCategory({ ...category, [action.name]: value });
  };

  const onSubmit = async (e) => {
    if (title === '' || location === '') {
      M.toast({ html: 'Please enter category' });
    } else {
      e.preventDefault();
      const formData = new FormData();
      formData.append('file', file);
      try {
        await axios.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } catch (err) {
        if (err.response.status === 500) {
          setMessage('There was a problem with the server');
        } else {
          setMessage(err.response.data.msg);
        }
      }
      addCategory({
        ...category,
        thumbnail: filename
      });
      M.toast({ html: `Category added` });
      setCategory(initialFormState);
      history.push('categories');
    }
  };

  return (
    <div className="container row-style">
      <Row>
        <form>
          <TextInput
            id="add-cat-title"
            name="title"
            placeholder="Title *"
            value={title}
            onChange={onChange}
            s={12}
          />
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
          {message && <Message msg={message} />}
          <TextInput
            id="add-cat-thumb"
            name="thumbnail"
            type="file"
            label={filename}
            value={thumbnail}
            onChange={onChangeFile}
            s={12}
          />
          <Button
            onClick={onSubmit}
            variant="contained"
            color="primary"
            className="right"
            type="submit"
          >
            Submit
            <Icon right>send</Icon>
          </Button>
        </form>
      </Row>
    </div>
  );
};

AddCategory.propTypes = {
  addCategory: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
};

export default connect(null, { addCategory })(AddCategory);
