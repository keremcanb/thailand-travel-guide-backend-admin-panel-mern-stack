import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import PlaceItem from './PlaceItem';
import Preloader from '../layout/Preloader';
import { getPlaces } from '../../actions/place';

const Places = ({ getPlaces, place: { places, loading } }) => {
  const classes = useStyles();

  useEffect(() => {
    getPlaces();
  }, [getPlaces]);

  return !(loading || places === null) ? (
    <Container>
      {!loading && places.length === 0 ? (
        <p className="center">No places to show...</p>
      ) : (
        <Grid className={classes.gridMain}>
          {places.map((place) => (
            <PlaceItem key={place._id} place={place} />
          ))}
        </Grid>
      )}
    </Container>
  ) : (
    <Preloader />
  );
};

const useStyles = makeStyles((theme) => ({
  gridMain: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: theme.spacing(7),
    justifyContent: 'center',
    marginTop: '30px'
  }
}));

Places.propTypes = {
  place: PropTypes.object.isRequired,
  getPlaces: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  place: state.place
});

export default connect(mapStateToProps, { getPlaces })(Places);
