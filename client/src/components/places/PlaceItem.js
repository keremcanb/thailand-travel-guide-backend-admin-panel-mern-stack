/* eslint-disable import/extensions */
import React from 'react';
// import Moment from 'react-moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import M from 'materialize-css/dist/js/materialize.min.js';
import { deletePlace, setCurrent } from '../../actions/place';

const PlaceItem = ({ deletePlace, setCurrent, place }) => {
  const classes = useStyles();

  const onDelete = () => {
    deletePlace(place._id);

    M.toast({ html: 'Place Deleted' });
  };

  return (
    <Grid className={classes.gridMain}>
      <div>
        <img src={place.thumbnail} alt={place.title} width={150} height={75} />
      </div>
      <div>
        <h6 style={{ textAlign: 'center' }}>{place.title}</h6>
      </div>
      <br />
      <div>
        <a
          href='#edit-place-modal'
          onClick={() => setCurrent(place)}
          className={`modal-trigger ${
            place.attention ? 'red-text' : 'blue-text'
          }`}
        >
          <i className='material-icons blue-text'>edit</i>
        </a>
        <a href='#!' onClick={onDelete} className='secondary-content'>
          <i className='material-icons red-text'>delete</i>
        </a>
      </div>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  gridMain: {
    justifyContent: 'center',
  },
  gridFab: {
    float: 'right',
  },
}));

PlaceItem.propTypes = {
  place: PropTypes.object.isRequired,
  deletePlace: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
};

export default connect(null, { deletePlace, setCurrent })(PlaceItem);
