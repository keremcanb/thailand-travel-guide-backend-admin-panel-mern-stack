/* eslint-disable import/extensions */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import M from 'materialize-css/dist/js/materialize.min.js';
// import { Media, Image, Modal, Container, Spinner } from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { deleteLocation, setCurrent } from '../../actions/location';

const LocationItem = ({ location, deleteLocation, setCurrent }) => {
  const onDelete = () => {
    deleteLocation(location.id);
    // M.toast({ html: 'Location Deleted' });
  };

  return (
    <Grid key={location._id}>
      <img
        src={location.thumbnail}
        alt={location.title}
        // className='mr-4'
        thumbnail
        width={150}
        height={75}
      />
      <h6>
        <strong>{location.title}</strong>
      </h6>
      <IconButton
        color='primary'
        className='shadow-sm mr-4'
        size='small'
        // onClick={() => {
        //   editItem(item);
        // }}
      >
        <EditIcon />
      </IconButton>
      <IconButton
        color='secondary'
        className='shadow-sm'
        size='small'
        onClick={onDelete}
      >
        <DeleteIcon />
      </IconButton>
    </Grid>
  );
};

LocationItem.propTypes = {
  location: PropTypes.object.isRequired,
  deleteLocation: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
};

export default connect(null, { deleteLocation, setCurrent })(LocationItem);
