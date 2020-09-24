import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ProgressBar, Row } from 'react-materialize';
import CategoryItem from './CategoryItem';
import { getCategories } from '../../actions/category';

const Categories = ({ getCategories, category: { categories, loading } }) => {
  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return loading || categories === null ? (
    <ProgressBar />
  ) : (
    <>
      {!loading && categories.length === 0 ? (
        <p className="center">No categories to show...</p>
      ) : (
        <Row style={gridStyle}>
          {categories.map((category) => (
            <CategoryItem key={category._id} category={category} />
          ))}
        </Row>
      )}
    </>
  );
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  justifyContent: 'center',
  alignContent: 'center',
  gridRowGap: '20px',
  gridColumnGap: '50px'
};

Categories.propTypes = {
  category: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  category: state.category
});

export default connect(mapStateToProps, { getCategories })(Categories);
