import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TextInput, Row, Container } from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import useResources from '../../utils/useResources';
import { updateCategory } from '../../actions/category';
import FileUpload from '../upload/FileUpload';

const EditCategory = ({ current, updateCategory, history }) => {
  const [category, setCategory] = useState('');
  const { title, thumbnail, location } = category;
  const locations = useResources('locations');
  const animatedComponents = makeAnimated();
  const [submittedFileName, setSubmittedFileName] = useState('');

  useEffect(() => {
    if (current) {
      setCategory(current);
    }
  }, [current]);

  const onChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const onSelect = (value, action) => {
    setCategory({ ...category, [action.name]: value });
  };

  const onSubmit = () => {
    updateCategory({ ...category, thumbnail: submittedFileName });
    M.toast({ html: 'Category updated' });
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

EditCategory.propTypes = {
  current: PropTypes.object.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  updateCategory: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  current: state.category.current
});

export default connect(mapStateToProps, { updateCategory })(EditCategory);
