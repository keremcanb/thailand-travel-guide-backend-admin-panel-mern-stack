/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
      <div className="fixed-action-btn">
        <Link to="addcategory">
          <a className="btn-floating btn-large blue darken-2">
            <i className="large material-icons">add</i>
          </a>
        </Link>
      </div>
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
