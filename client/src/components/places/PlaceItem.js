import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazy-load';
import { Col, Row, Icon } from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import { deletePlace, setCurrent } from '../../actions/place';

const PlaceItem = ({ deletePlace, setCurrent, place }) => {
  const onDelete = () => {
    deletePlace(place._id);
    M.toast({ html: 'Place Deleted' });
  };

  return (
    <Row>
      <Col>
        <LazyLoad>
          <img
            src={place.thumbnail}
            alt={place.title}
            className="responsive-img z-depth-2"
          />
        </LazyLoad>
        <h6 style={{ textAlign: 'center' }}>{place.title}</h6>
        <Col>
          <a
            href="#edit-place-modal"
            className="modal-trigger"
            nClick={() => setCurrent(place)}
          >
            <Icon left>edit</Icon>
          </a>
          <a href="#!" onClick={onDelete} className="secondary-content">
            <Icon right className="red-text text-darken-4">
              delete
            </Icon>
          </a>
        </Col>
      </Col>
    </Row>
  );
};

PlaceItem.propTypes = {
  place: PropTypes.object.isRequired,
  deletePlace: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired
};

export default connect(null, { deletePlace, setCurrent })(PlaceItem);
