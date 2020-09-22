import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import LocationItem from './LocationItem';
import Preloader from '../layout/Preloader';
import { getLocations } from '../../actions/location';
import AddLocationModal from './AddLocationModal';

const LocationsNew = ({ location: { locations, loading }, getLocations }) => {
  const classes = useStyles();

  useEffect(() => {
    getLocations();
  }, [getLocations]);

  return !(loading || locations === null) ? (
    <>
      <Container>
        <Grid className={classes.gridMain}>
          {locations.map((location) => (
            <LocationItem key={location._id} location={location} />
          ))}
        </Grid>
        <Grid className={classes.gridFab}>
          <Fab color='primary' aria-label='add' href='#add-log-modal'>
            <AddIcon />
          </Fab>
        </Grid>
      </Container>
      <AddLocationModal />
    </>
  ) : (
    <Preloader />
  );
};

const useStyles = makeStyles((theme) => ({
  gridMain: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: theme.spacing(3),
    justifyContent: 'center',
    marginTop: '100px',
  },
  gridFab: {
    float: 'right',
  },
}));

LocationsNew.propTypes = {
  location: PropTypes.object.isRequired,
  getLocations: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  location: state.location,
});

export default connect(mapStateToProps, { getLocations })(LocationsNew);
