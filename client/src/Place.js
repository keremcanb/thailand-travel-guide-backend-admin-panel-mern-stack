import React, { useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import SearchBar from './components/layout/SearchBar';
import Places from './components/places/Places';
import AddPlaceModal from './components/places/AddPlaceModal';
import EditPlaceModal from './components/places/EditPlaceModal';
import AddTechModal from './components/techs/AddTechModal';
import 'materialize-css/dist/css/materialize.min.css';
// import TechListModal from './components/techs/TechListModal';

const Place = () => {
  useEffect(() => {
    M.AutoInit();
  }, []);

  return (
    <>
      <SearchBar />
      <div className="container">
        <div className="fixed-action-btn">
          <a
            href="#add-place-modal"
            className="btn-floating btn-large blue darken-2 modal-trigger"
          >
            <i className="large material-icons">add</i>
          </a>
        </div>
        <AddPlaceModal />
        <EditPlaceModal />
        <AddTechModal />
        {/* <TechListModal /> */}
        <Places />
      </div>
    </>
  );
};

export default Place;
