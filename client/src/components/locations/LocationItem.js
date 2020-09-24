import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col, Row, Icon } from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import { deleteLocation, setCurrent } from '../../actions/location';

const LocationItem = ({ deleteLocation, setCurrent, location }) => {
  const onDelete = () => {
    deleteLocation(location._id);
    M.toast({ html: 'Location Deleted' });
  };

  return (
    <Row>
      <Col>
        <img
          src={location.thumbnail}
          alt={location.title}
          className="responsive-img z-depth-2"
        />
        <h6 style={{ textAlign: 'center' }}>{location.title}</h6>
        <Col>
          <a
            href="#edit-location-modal"
            className="modal-trigger"
            onClick={() => setCurrent(location)}
          >
            <Icon left>edit</Icon>
          </a>
          <a href="#!" onClick={onDelete}>
            <Icon right className="red-text text-darken-4">
              delete
            </Icon>
          </a>
        </Col>
      </Col>
    </Row>
  );
};

LocationItem.propTypes = {
  location: PropTypes.object.isRequired,
  deleteLocation: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired
};

export default connect(null, { deleteLocation, setCurrent })(LocationItem);
