import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col, Icon, Card, CardTitle } from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import { deleteCategory, setCurrent } from '../../actions/category';

const CategoryItem = ({ deleteCategory, setCurrent, category }) => {
  const onDelete = () => {
    deleteCategory(category._id);
    M.toast({ html: 'Category Deleted' });
  };

  return (
    <Col m={3} s={12} className="center">
      <Card
        actions={[
          <>
            <a
              href="#edit-category-modal"
              className="modal-trigger"
              onClick={() => setCurrent(category)}
              style={{
                marginRight: '2rem'
              }}
            >
              <Icon>edit</Icon>
            </a>
            <a href="#!" onClick={onDelete}>
              <Icon className="red-text text-darken-4">delete</Icon>
            </a>
          </>
        ]}
        closeIcon={<Icon>close</Icon>}
        header={<CardTitle image={category.thumbnail}></CardTitle>}
        revealIcon={<Icon>more_vert</Icon>}
      >
        <h6>{category.title}</h6>
      </Card>
      {/* <img
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
      </a> */}
    </Col>
  );
};

CategoryItem.propTypes = {
  category: PropTypes.object.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired
};

export default connect(null, { deleteCategory, setCurrent })(CategoryItem);
