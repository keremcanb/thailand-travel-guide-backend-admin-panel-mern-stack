/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'react-materialize';
import { getCategories } from '../../actions/category';
import CategoryList from './CategoryList';

const Categories = ({ getCategories, category: { categories } }) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const onSearch = (e) => {
    setSearch(e.target.value);
  };

  const filterSearch =
    categories !== null &&
    categories.filter((cat) => {
      return cat.title.toLowerCase().includes(search.toLowerCase());
    });

  return (
    <>
      <CategoryList selectedItem={filterSearch} onSearch={onSearch} />
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
  category: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  category: state.category
});

export default connect(mapStateToProps, { getCategories })(Categories);
