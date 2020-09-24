import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col, Icon } from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import { deleteLocation, setCurrent } from '../../actions/location';

const LocationItem = ({ deleteLocation, setCurrent, location }) => {
  const onDelete = () => {
    deleteLocation(location._id);
    M.toast({ html: 'Location Deleted' });
  };

  return (
    <Col style={{ textAlign: 'center' }}>
      <img
        src={location.thumbnail}
        alt={location.title}
        className="z-depth-2"
        width="150"
      />
      <h6>{location.title}</h6>
      <a
        href="#edit-location-modal"
        className="modal-trigger"
        onClick={() => setCurrent(location)}
        style={{
          marginRight: '1rem'
        }}
      >
        <Icon>edit</Icon>
      </a>
      <a href="#!" onClick={onDelete}>
        <Icon className="red-text text-darken-4">delete</Icon>
      </a>
    </Col>
  );
};

LocationItem.propTypes = {
  location: PropTypes.object.isRequired,
  deleteLocation: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired
};

export default connect(null, { deleteLocation, setCurrent })(LocationItem);
