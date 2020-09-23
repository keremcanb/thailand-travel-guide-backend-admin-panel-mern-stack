import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import M from 'materialize-css/dist/js/materialize.min.js';
import { deleteLocation, setCurrent } from '../../actions/location';

const LocationItem = ({ deleteLocation, setCurrent, location }) => {
  const onDelete = () => {
    deleteLocation(location._id);
    M.toast({ html: 'Location Deleted' });
  };

  return (
    <Grid>
      <img
        src={location.thumbnail}
        alt={location.title}
        width={150}
        height={75}
      />
      <h6 style={{ textAlign: 'center' }}>{location.title}</h6>
      <div>
        <a href="#edit-location-modal" onClick={() => setCurrent(location)}>
          <i className="material-icons blue-text">edit</i>
        </a>
        <a href="#!" onClick={onDelete} className="secondary-content">
          <i className="material-icons red-text">delete</i>
        </a>
      </div>
    </Grid>
  );
};

LocationItem.propTypes = {
  location: PropTypes.object.isRequired,
  deleteLocation: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired
};

export default connect(null, { deleteLocation, setCurrent })(LocationItem);
