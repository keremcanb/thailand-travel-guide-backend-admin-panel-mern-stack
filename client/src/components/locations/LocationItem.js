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
      <Col style={{ textAlign: 'center' }}>
        <img
          src={location.thumbnail}
          alt={location.title}
          width={150}
          height={75}
        />
        <h6>{location.title}</h6>
      </Col>
      <Col>
        <a
          href="#edit-location-modal"
          className="modal-trigger"
          onClick={() => setCurrent(location)}
        >
          <Icon>edit</Icon>
        </a>
        <a href="#!" onClick={onDelete} className="secondary-content">
          <Icon>delete</Icon>
        </a>
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
