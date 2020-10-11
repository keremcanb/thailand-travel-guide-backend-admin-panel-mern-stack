import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Preloader, Button, Icon } from 'react-materialize';
import { Link } from 'react-router-dom';
import CategoryItem from './CategoryItem';
import { getCategories } from '../../actions/category';
import CategoryFilter from './CategoryFilter';

const Categories = ({
  getCategories,
  category: { categories, loading, filtered }
}) => {
  useEffect(() => {
    getCategories();
    document.title = 'Categories';
  }, [getCategories]);

  return (
    <>
      <CategoryFilter />
      {categories && !loading ? (
        <Row>
          <Col className="grid-style">
            {filtered
              ? filtered.map((category) => (
                  <CategoryItem key={category._id} category={category} />
                ))
              : categories.map((category) => (
                  <CategoryItem key={category._id} category={category} />
                ))}
          </Col>
        </Row>
      ) : (
        <Preloader
          className="loader"
          active
          color="blue"
          flashing={false}
          size="big"
        />
      )}
      <Link to="addcategory">
        <Button
          className="blue darken-2"
          fab
          floating
          large
          node="button"
          icon={<Icon>add</Icon>}
        />
      </Link>
    </>
  );
};

Categories.propTypes = {
  getCategories: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  category: state.category,
  filtered: state.filtered
});

export default connect(mapStateToProps, { getCategories })(Categories);
