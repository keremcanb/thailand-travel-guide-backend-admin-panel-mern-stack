import React from 'react';
import SearchBar from './components/layout/SearchBar';
import Places from './components/places/Places';
import AddPlaceModal from './components/places/AddPlaceModal';
import EditPlaceModal from './components/places/EditPlaceModal';

const Place = () => {
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
