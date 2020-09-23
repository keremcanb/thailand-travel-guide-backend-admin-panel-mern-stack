import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import CategoryItem from './CategoryItem';
import { getCategories } from '../../actions/category';

const Categories = ({ getCategories, category: { categories, loading } }) => {
  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return loading || categories === null ? (
    <LinearProgress />
  ) : (
    <Container>
      {!loading && categories.length === 0 ? (
        <p className="center">No categories to show...</p>
      ) : (
        <Grid style={gridStyle}>
          {categories.map((category) => (
            <CategoryItem key={category._id} category={category} />
          ))}
        </Grid>
      )}
    </Container>
  );
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  justifyContent: 'center',
  alignContent: 'center',
  gridRowGap: '20px',
  gridColumnGap: '50px',
  marginTop: '40px'
};

Categories.propTypes = {
  category: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  category: state.category
});

export default connect(mapStateToProps, { getCategories })(Categories);
