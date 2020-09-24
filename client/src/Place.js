import React, { useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import SearchBar from './components/layout/SearchBar';
import Places from './components/places/Places';
import AddPlaceModal from './components/places/AddPlaceModal';
import EditPlaceModal from './components/places/EditPlaceModal';
import 'materialize-css/dist/css/materialize.min.css';

const Place = () => {
  useEffect(() => {
    M.AutoInit();
  }, []);

  return (
    <>
      <SearchBar />
      <AddPlaceModal />
      <EditPlaceModal />
      <Places />
    </>
  );
};

export default Place;
