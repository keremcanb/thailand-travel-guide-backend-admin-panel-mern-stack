import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Icon, TextInput, Row, Container } from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import useResources from '../../utils/useResources';
import { updateCategory } from '../../actions/category';

const EditCategory = ({ current, updateCategory, history }) => {
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
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const onSelect = (value, action) => {
    setCategory({ ...category, [action.name]: value });
  };

  const onSubmit = () => {
    updateCategory(category);
    M.toast({ html: 'Category updated' });
    history.push('categories');
  };

  return (
    <Container className="center margin-top">
      <Row>
        <form onSubmit={onSubmit}>
          <TextInput
            id="edit-cat-title"
            name="title"
            label="Title"
            value={title}
            onChange={onChange}
            s={12}
          />
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
            options={locations.map((loc) => ({
              value: loc.title,
              label: loc.title
            }))}
          />
          <TextInput
            id="edit-cat-thumb"
            name="thumbnail"
            label="Thumbnail"
            value={thumbnail}
            onChange={onChange}
            s={12}
          />
          <Button
            variant="contained"
            className="right blue darken-2"
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
