import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col, Icon } from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import { deleteCategory, setCurrent } from '../../actions/category';

const CategoryItem = ({ deleteCategory, setCurrent, category }) => {
  const onDelete = () => {
    deleteCategory(category._id);
    M.toast({ html: 'Category Deleted' });
  };

  return (
    <Col className="center">
      <img
        src={category.thumbnail}
        alt={category.title}
        className="z-depth-2"
        width="150"
      />
      <h6>{category.title}</h6>
      <a
        href="#edit-category-modal"
        className="modal-trigger"
        onClick={() => setCurrent(category)}
        style={{
          marginRight: '1rem'
        }}
      >
        <Icon>edit</Icon>
      </a>
      <a href="#!" onClick={onDelete}>
        <Icon className="red-text text-darken-4">delete</Icon>
      </a>
    </Col>
  );
};

CategoryItem.propTypes = {
  category: PropTypes.object.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired
};

export default connect(null, { deleteCategory, setCurrent })(CategoryItem);
