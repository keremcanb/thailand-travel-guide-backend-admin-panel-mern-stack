import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col, Icon, Card, CardTitle } from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import { deleteLocation, setCurrent } from '../../actions/location';

const LocationItem = ({ deleteLocation, setCurrent, location }) => {
  const onDelete = () => {
    deleteLocation(location._id);
    M.toast({ html: 'Location Deleted' });
  };

  return (
    <Col m={3} s={12} className="center">
      <Card
        actions={[
          <>
            <a
              href="#edit-location-modal"
              className="modal-trigger"
              onClick={() => setCurrent(location)}
              style={{
                marginRight: '3rem'
              }}
            >
              <Icon>edit</Icon>
            </a>
            <a href="#!" onClick={onDelete}>
              <Icon className="red-text text-darken-4">delete</Icon>
            </a>
          </>
        ]}
        header={
          <CardTitle image={location.thumbnail}>{location.title}</CardTitle>
        }
        closeIcon={<Icon>close</Icon>}
        revealIcon={<Icon>more_vert</Icon>}
      />
      {/* <img
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
      </a> */}
    </Col>
  );
};

LocationItem.propTypes = {
  location: PropTypes.object.isRequired,
  deleteLocation: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired
};

export default connect(null, { deleteLocation, setCurrent })(LocationItem);
