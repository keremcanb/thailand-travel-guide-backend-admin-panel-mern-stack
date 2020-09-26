/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Col,
  Row,
  Icon,
  Card,
  CardTitle,
  Modal,
  Button
} from 'react-materialize';
import FadeIn from 'react-lazyload-fadein';
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
              <FadeIn>
                {(onload) => (
                  <img
                    src={category.thumbnail}
                    alt={category.title}
                    width="200px"
                    height="150px"
                    onLoad={onload}
                  />
                )}
              </FadeIn>
              <CardTitle>{category.title}</CardTitle>
            </>
          }
        >
          <div className="center">
            <a
              href="#edit-category-modal"
              className="modal-trigger btn-floating blue"
              onClick={() => setCurrent(category)}
              style={{
                marginRight: '3rem'
              }}
            >
              <Icon>edit</Icon>
            </a>
            <Modal
              actions={[
                <Button
                  className="red"
                  modal="close"
                  node="button"
                  waves="green"
                  onClick={onDelete}
                >
                  Delete
                  <Icon right>delete</Icon>
                </Button>
              ]}
              header="Are you sure?"
              id="Modal-0"
              open={false}
              trigger={
                <a className="btn-floating red">
                  <Icon>delete</Icon>
                </a>
              }
            />
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
