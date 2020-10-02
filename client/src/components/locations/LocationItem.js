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
        <Card
          className="hoverable"
          header={
            <>
              <img
                src={location.thumbnail}
                alt={location.title}
                width="200px"
                height="150px"
              />
              <CardTitle>{location.title}</CardTitle>
            </>
          }
        >
          <div className="center">
            <Link to="editlocation">
              <a
                className="modal-trigger btn-floating blue"
                onClick={() => setCurrent(location)}
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

LocationItem.propTypes = {
  location: PropTypes.object.isRequired,
  deleteLocation: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired
};

export default connect(null, { deleteLocation, setCurrent })(LocationItem);
