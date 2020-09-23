import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import LocationItem from './LocationItem';
import Preloader from '../layout/Preloader';
import { getLocations } from '../../actions/location';

const Locations = ({ getLocations, location: { locations, loading } }) => {
  const classes = useStyles();

  useEffect(() => {
    getLocations();
  }, [getLocations]);

  return !(loading || locations === null) ? (
    <Container>
      {!loading && locations.length === 0 ? (
        <p className="center">No locations to show...</p>
      ) : (
        <Grid className={classes.gridMain}>
          {locations.map((location) => (
            <LocationItem key={location._id} location={location} />
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

Locations.propTypes = {
  location: PropTypes.object.isRequired,
  getLocations: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  location: state.location
});

export default connect(mapStateToProps, { getLocations })(Locations);
