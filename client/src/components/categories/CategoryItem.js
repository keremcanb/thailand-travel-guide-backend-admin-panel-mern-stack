/* eslint-disable import/extensions */
import React from 'react';
// import Moment from 'react-moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import M from 'materialize-css/dist/js/materialize.min.js';
import { deleteCategory, setCurrent } from '../../actions/category';

const CategoryItem = ({ deleteCategory, setCurrent, category }) => {
  const classes = useStyles();

  const onDelete = () => {
    deleteCategory(category._id);

    M.toast({ html: 'Category Deleted' });
  };

  return (
    <Grid className={classes.gridMain}>
      <div>
        <img
          src={category.thumbnail}
          alt={category.title}
          width={150}
          height={75}
        />
      </div>
      <div>
        <h6 style={{ textAlign: 'center' }}>{category.title}</h6>
      </div>
      <br />
      <div>
        <a
          href='#edit-category-modal'
          onClick={() => setCurrent(category)}
          className={`modal-trigger ${
            category.attention ? 'red-text' : 'blue-text'
          }`}
        >
          <i className='material-icons blue-text'>edit</i>
        </a>
        <a href='#!' onClick={onDelete} className='secondary-content'>
          <i className='material-icons red-text'>delete</i>
        </a>
      </div>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  gridMain: {
    justifyContent: 'center',
  },
  gridFab: {
    float: 'right',
  },
}));

CategoryItem.propTypes = {
  category: PropTypes.object.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
};

export default connect(null, { deleteCategory, setCurrent })(CategoryItem);
