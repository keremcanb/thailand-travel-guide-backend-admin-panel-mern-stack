import React from 'react';
import SearchBar from './components/layout/SearchBar';
import Locations from './components/locations/Locations';
import AddLocationModal from './components/locations/AddLocationModal';
import EditLocationModal from './components/locations/EditLocationModal';

const Location = () => {
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
