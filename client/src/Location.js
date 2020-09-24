import React, { useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import SearchBar from './components/layout/SearchBar';
import Locations from './components/locations/Locations';
import AddLocationModal from './components/locations/AddLocationModal';
import EditLocationModal from './components/locations/EditLocationModal';
import 'materialize-css/dist/css/materialize.min.css';

const Location = () => {
  useEffect(() => {
    M.AutoInit();
  }, []);

  return (
    <>
      <SearchBar />
      <Locations />
      <AddLocationModal />
      <EditLocationModal />
    </>
  );
};

export default Location;
