/* eslint-disable import/extensions */
import React, { useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import SearchBar from './components/layout/SearchBar';
import Locations from './components/locations/Locations';
import AddBtnLocation from './components/layout/AddBtnLocation';
import AddLocationModal from './components/locations/AddLocationModal';
import EditLocationModal from './components/locations/EditLocationModal';
import AddTechModal from './components/techs/AddTechModal';
// import TechListModal from './components/techs/TechListModal';
import 'materialize-css/dist/css/materialize.min.css';

const Location = () => {
  useEffect(() => {
    M.AutoInit();
  }, []);

  return (
    <>
      <SearchBar />
      <div className='container'>
        <AddBtnLocation />
        <AddLocationModal />
        <EditLocationModal />
        <AddTechModal />
        {/* <TechListModal /> */}
        <Locations />
      </div>
    </>
  );
};

export default Location;
