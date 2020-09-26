import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCategories } from '../../actions/category';
import CategoryList from './CategoryList';
import AddCategoryModal from './AddCategoryModal';
import EditCategoryModal from './EditCategoryModal';

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
      <AddCategoryModal />
      <EditCategoryModal />
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
