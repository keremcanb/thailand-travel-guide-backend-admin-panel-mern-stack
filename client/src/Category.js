/* eslint-disable import/extensions */
import React, { useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import SearchBar from './components/layout/SearchBar';
import Categories from './components/categories/Categories';
import AddBtnCategory from './components/layout/AddBtnCategory';
import AddCategoryModal from './components/categories/AddCategoryModal';
import EditCategoryModal from './components/categories/EditCategoryModal';
import AddTechModal from './components/techs/AddTechModal';
// import TechListModal from './components/techs/TechListModal';
import 'materialize-css/dist/css/materialize.min.css';

const Category = () => {
  useEffect(() => {
    M.AutoInit();
  }, []);

  return (
    <>
      <SearchBar />
      <div className='container'>
        <AddBtnCategory />
        <AddCategoryModal />
        <EditCategoryModal />
        <AddTechModal />
        {/* <TechListModal /> */}
        <Categories />
      </div>
    </>
  );
};

export default Category;
