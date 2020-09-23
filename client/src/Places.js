/* eslint-disable import/extensions */
import React, { useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import SearchBar from './components/layout/SearchBar';
import Places from './components/places/Places';
import AddBtn from './components/layout/AddBtn';
import AddPlaceModal from './components/places/AddPlaceModal';
import EditPlaceModal from './components/places/EditPlaceModal';
import AddTechModal from './components/techs/AddTechModal';
// import TechListModal from './components/techs/TechListModal';
import 'materialize-css/dist/css/materialize.min.css';

const Place = () => {
  useEffect(() => {
    M.AutoInit();
  }, []);

  return (
    <>
      <SearchBar />
      <div className='container'>
        <AddBtn />
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
