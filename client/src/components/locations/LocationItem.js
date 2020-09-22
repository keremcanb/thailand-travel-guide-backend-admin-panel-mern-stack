/* eslint-disable import/extensions */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min.js';
import { Media, Image, Modal, Container, Spinner } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { deleteLocation, setCurrent } from '../../actions/location';

const LocationItem = ({ location, deleteLocation, setCurrent }) => {
  const onDelete = () => {
    deleteLocation(location.id);
    M.toast({ html: 'Location Deleted' });
  };

  return (
    <Container key={location._id}>
      <Image
        src={location.thumbnail}
        alt={location.title}
        // className='mr-4'
        thumbnail
        width={120}
        height={40}
      />
      <Media.Body>
        <h6 className='text-center mt-1 mb-4'>
          <strong>{location.title}</strong>
        </h6>
        <Container className='d-flex justify-content-center'>
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
        </Container>
      </Media.Body>
      <hr />
    </Container>
  );
};

LocationItem.propTypes = {
  location: PropTypes.object.isRequired,
  deleteLocation: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
};

export default connect(null, { deleteLocation, setCurrent })(LocationItem);
