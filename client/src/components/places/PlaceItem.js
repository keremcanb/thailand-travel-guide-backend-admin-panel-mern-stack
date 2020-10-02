/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Col,
  Row,
  Icon,
  Card,
  CardTitle,
  Modal,
  Button
} from 'react-materialize';
import FadeIn from 'react-lazyload-fadein';
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
              <FadeIn height={150}>
                {(onload) => (
                  <img
                    src={place.thumbnail}
                    alt={place.title}
                    width="200"
                    height="150"
                    onLoad={onload}
                  />
                )}
              </FadeIn>
              <CardTitle>{place.title}</CardTitle>
            </>
          }
        >
          <div className="center">
            <Link to="editplace">
              <a
                className="modal-trigger btn-floating blue"
                onClick={() => setCurrent(place)}
                style={{
                  marginRight: '3rem'
                }}
              >
                <Icon>edit</Icon>
              </a>
            </Link>
            <Modal
              actions={[
                <Button
                  className="red"
                  modal="close"
                  node="button"
                  waves="green"
                  onClick={onDelete}
                >
                  Delete
                  <Icon right>delete</Icon>
                </Button>
              ]}
              header="Are you sure?"
              id="Modal-0"
              open={false}
              trigger={
                <a className="btn-floating red">
                  <Icon>delete</Icon>
                </a>
              }
            />
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
