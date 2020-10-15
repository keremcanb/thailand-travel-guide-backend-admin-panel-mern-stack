import React from 'react';
import { Preloader } from 'react-materialize';

const Loader = () => {
  return (
    <Preloader
      className="loader"
      active
      color="blue"
      flashing={false}
      size="big"
    />
  );
};

export default Loader;
