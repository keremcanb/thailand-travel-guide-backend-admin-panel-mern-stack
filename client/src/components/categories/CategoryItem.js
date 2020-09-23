import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import M from 'materialize-css/dist/js/materialize.min.js';
import { deleteCategory, setCurrent } from '../../actions/category';

const CategoryItem = ({ deleteCategory, setCurrent, category }) => {
  const onDelete = () => {
    deleteCategory(category._id);
    M.toast({ html: 'Category Deleted' });
  };

  return (
    <Grid>
      <img
        src={category.thumbnail}
        alt={category.title}
        width={150}
        height={75}
      />
      <h6 style={{ textAlign: 'center' }}>{category.title}</h6>
      <div>
        <a href="#edit-category-modal" onClick={() => setCurrent(category)}>
          <i className="material-icons blue-text">edit</i>
        </a>
        <a href="#!" onClick={onDelete} className="secondary-content">
          <i className="material-icons red-text">delete</i>
        </a>
      </div>
    </Grid>
  );
};

CategoryItem.propTypes = {
  category: PropTypes.object.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired
};

export default connect(null, { deleteCategory, setCurrent })(CategoryItem);
