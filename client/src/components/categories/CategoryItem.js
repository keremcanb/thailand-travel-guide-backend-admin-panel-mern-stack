/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col, Row, Icon, Card, CardTitle } from 'react-materialize';
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
        <Card
          className="hoverable"
          header={
            <>
              <img
                src={category.thumbnail}
                alt={category.title}
                width="200px"
                height="150px"
              />
              <CardTitle>{category.title}</CardTitle>
            </>
          }
        >
          <div className="center">
            <a
              href="#edit-category-modal"
              className="modal-trigger btn-floating"
              onClick={() => setCurrent(category)}
              style={{
                marginRight: '3rem'
              }}
            >
              <Icon>edit</Icon>
            </a>
            <a className="btn-floating red" onClick={onDelete}>
              <Icon>delete</Icon>
            </a>
          </div>
        </Card>
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
