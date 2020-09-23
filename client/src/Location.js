import React, { useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import SearchBar from './components/layout/SearchBar';
import Locations from './components/locations/Locations';
import AddLocationModal from './components/locations/AddLocationModal';
import EditLocationModal from './components/locations/EditLocationModal';
import AddTechModal from './components/techs/AddTechModal';
import 'materialize-css/dist/css/materialize.min.css';
// import TechListModal from './components/techs/TechListModal';

const Location = () => {
  useEffect(() => {
    M.AutoInit();
  }, []);

  return (
    <>
      <SearchBar />
      <div className="container">
        <div className="fixed-action-btn">
          <a
            href="#add-location-modal"
            className="btn-floating btn-large blue darken-2 modal-trigger"
          >
            <i className="large material-icons">add</i>
          </a>
        </div>
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
