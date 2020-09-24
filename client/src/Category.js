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
      <div className="container">
        <div className="fixed-action-btn">
          <a
            href="#add-category-modal"
            className="btn-floating btn-large blue darken-2 modal-trigger"
          >
            <i className="large material-icons">add</i>
          </a>
        </div>
        <AddCategoryModal />
        <EditCategoryModal />
        <Categories />
      </div>
    </>
  );
};

export default Category;
