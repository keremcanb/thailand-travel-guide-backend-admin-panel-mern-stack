import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col, Row, Icon } from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import { deleteCategory, setCurrent } from '../../actions/category';

const CategoryItem = ({ deleteCategory, setCurrent, category }) => {
  const onDelete = () => {
    deleteCategory(category._id);
    M.toast({ html: 'Category Deleted' });
  };

  return (
    <Row>
      <Col>
        <img
          src={category.thumbnail}
          alt={category.title}
          className="responsive-img z-depth-2"
        />
        <h6 style={{ textAlign: 'center' }}>{category.title}</h6>
        <Col>
          <a
            href="#edit-category-modal"
            className="modal-trigger"
            onClick={() => setCurrent(category)}
          >
            <Icon left>edit</Icon>
          </a>
          <a href="#!" onClick={onDelete} className="secondary-content">
            <Icon right className="red-text text-darken-4">
              delete
            </Icon>
          </a>
        </Col>
      </Col>
    </Row>
  );
};

CategoryItem.propTypes = {
  category: PropTypes.object.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired
};

export default connect(null, { deleteCategory, setCurrent })(CategoryItem);
