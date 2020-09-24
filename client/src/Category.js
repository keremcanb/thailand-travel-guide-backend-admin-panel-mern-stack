import React, { useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import SearchBar from './components/layout/SearchBar';
import Categories from './components/categories/Categories';
import AddCategoryModal from './components/categories/AddCategoryModal';
import EditCategoryModal from './components/categories/EditCategoryModal';
import 'materialize-css/dist/css/materialize.min.css';

const Category = () => {
  useEffect(() => {
    M.AutoInit();
  }, []);

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
