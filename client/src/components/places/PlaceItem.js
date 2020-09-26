/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col, Row, Icon, Card, CardTitle } from 'react-materialize';
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
        <Card
          className="hoverable"
          header={
            <>
              <img
                src={place.thumbnail}
                alt={place.title}
                width="200px"
                height="150px"
              />
              <CardTitle>{place.title}</CardTitle>
            </>
          }
        >
          <div className="center">
            <a
              href="#edit-place-modal"
              className="modal-trigger btn-floating"
              onClick={() => setCurrent(place)}
              style={{
                marginRight: '3rem'
              }}
            >
              <Icon>edit</Icon>
            </a>
            <a className="btn-floating red" onClick={onDelete}>
              <Icon>delete</Icon>
            </a>
          </div>
        </Card>
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
