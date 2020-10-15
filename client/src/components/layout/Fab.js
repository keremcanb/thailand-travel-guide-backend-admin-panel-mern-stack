import React from 'react';
import { Button, Icon } from 'react-materialize';

const Fab = () => {
  return (
    <Button
      className="blue darken-2"
      fab
      floating
      large
      node="button"
      icon={<Icon>add</Icon>}
    />
  );
};

export default Fab;
