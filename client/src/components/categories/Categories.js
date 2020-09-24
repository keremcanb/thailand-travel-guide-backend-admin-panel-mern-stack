import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, ProgressBar } from 'react-materialize';
import CategoryItem from './CategoryItem';
import { getCategories } from '../../actions/category';

const Categories = ({ getCategories, category: { categories, loading } }) => {
  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return loading || categories === null ? (
    <ProgressBar />
  ) : (
    <Row>
      {!loading && categories.length === 0 ? (
        <p className="center">No categories to show...</p>
      ) : (
        <Col style={gridStyle}>
          {categories.map((category) => (
            <CategoryItem key={category._id} category={category} />
          ))}
        </Col>
      )}
    </Row>
  );
};

const gridStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  flexWrap: 'wrap',
  alignItems: 'space-evenly',
  alignContent: 'space-evenly'
  // display: 'grid',
  // gridTemplateColumns: 'repeat(4, 1fr)',
  // justifyContent: 'center',
  // alignContent: 'center',
  // gridGap: '5rem'
};

Categories.propTypes = {
  category: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  category: state.category
});

export default connect(mapStateToProps, { getCategories })(Categories);
