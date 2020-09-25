import React from 'react';
import SearchBar from './components/layout/SearchBar';
import Categories from './components/categories/Categories';
import AddCategoryModal from './components/categories/AddCategoryModal';
import EditCategoryModal from './components/categories/EditCategoryModal';

const Category = () => {
  return (
    <>
      <SearchBar />
      <AddCategoryModal />
      <EditCategoryModal />
      <Categories />
    </>
  );
};

export default Category;
