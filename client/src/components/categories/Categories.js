import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import CategoryItem from './CategoryItem';
import Preloader from '../layout/Preloader';
import { getCategories } from '../../actions/category';

const Categories = ({ getCategories, category: { categories, loading } }) => {
  const classes = useStyles();

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return !(loading || categories === null) ? (
    <Container>
      {!loading && categories.length === 0 ? (
        <p className="center">No categories to show...</p>
      ) : (
        <Grid className={classes.gridMain}>
          {categories.map((category) => (
            <CategoryItem key={category._id} category={category} />
          ))}
        </Grid>
      )}
    </Container>
  ) : (
    <Preloader />
  );
};

const useStyles = makeStyles((theme) => ({
  gridMain: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: theme.spacing(7),
    justifyContent: 'center',
    marginTop: '30px'
  }
}));

Categories.propTypes = {
  category: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  category: state.category
});

export default connect(mapStateToProps, { getCategories })(Categories);
