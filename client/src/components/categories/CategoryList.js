import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, ProgressBar } from 'react-materialize';
import CategoryItem from './CategoryItem';
import { getCategories } from '../../actions/category';
import SearchBar from '../layout/SearchBar';

const Categories = ({
  selectedItem,
  onSearch,
  getCategories,
  category: { categories, loading }
}) => {
  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return loading || categories === null ? (
    <ProgressBar className="blue" />
  ) : (
    <>
      <SearchBar onSearch={onSearch} />
      <Row>
        {!loading && selectedItem.length === 0 ? (
          <p className="center">No categories to show...</p>
        ) : (
          <Col style={gridStyle}>
            {selectedItem.map((category) => (
              <CategoryItem key={category._id} category={category} />
            ))}
          </Col>
        )}
      </Row>
    </>
  );
};

const gridStyle = {
  display: 'flex',
  justifyContent: 'space-evenly',
  flexWrap: 'wrap',
  alignItems: 'space-evenly',
  alignContent: 'space-evenly',
  gridGap: '5px'
};

Categories.propTypes = {
  category: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  category: state.category
});

export default connect(mapStateToProps, { getCategories })(Categories);
