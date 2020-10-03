import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Preloader } from 'react-materialize';
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

  return !(loading || categories === null) ? (
    <>
      <SearchBar onSearch={onSearch} />
      <Row>
        {!loading && selectedItem.length !== 0 ? (
          <Col className="grid-style">
            {selectedItem.map((category) => (
              <CategoryItem key={category._id} category={category} />
            ))}
          </Col>
        ) : (
          <p className="center">No categories to show</p>
        )}
      </Row>
    </>
  ) : (
    <Preloader
      className="loader"
      active
      color="blue"
      flashing={false}
      size="big"
    />
  );
};

Categories.propTypes = {
  category: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  selectedItem: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  category: state.category
});

export default connect(mapStateToProps, { getCategories })(Categories);
