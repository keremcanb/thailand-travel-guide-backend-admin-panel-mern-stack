import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazy-load';
import Grid from '@material-ui/core/Grid';
import M from 'materialize-css/dist/js/materialize.min.js';
import { deletePlace, setCurrent } from '../../actions/place';

const PlaceItem = ({ deletePlace, setCurrent, place }) => {
  const onDelete = () => {
    deletePlace(place._id);
    M.toast({ html: 'Place Deleted' });
  };

  return (
    <Grid>
      <LazyLoad>
        <img src={place.thumbnail} alt={place.title} width={150} height={75} />
      </LazyLoad>
      <h6 style={{ textAlign: 'center' }}>{place.title}</h6>
      <div>
        <a href="#edit-place-modal" onClick={() => setCurrent(place)}>
          <i className="material-icons blue-text">edit</i>
        </a>
        <a href="#!" onClick={onDelete} className="secondary-content">
          <i className="material-icons red-text">delete</i>
        </a>
      </div>
    </Grid>
  );
};

PlaceItem.propTypes = {
  place: PropTypes.object.isRequired,
  deletePlace: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired
};

export default connect(null, { deletePlace, setCurrent })(PlaceItem);
