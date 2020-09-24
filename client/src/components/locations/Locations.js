import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import LocationItem from './LocationItem';
import { getLocations } from '../../actions/location';

const Locations = ({ getLocations, location: { locations, loading } }) => {
  useEffect(() => {
    getLocations();
  }, [getLocations]);

  return loading || locations === null ? (
    <LinearProgress />
  ) : (
    <Container>
      {!loading && locations.length === 0 ? (
        <p className="center">No locations to show...</p>
      ) : (
        <Grid style={gridStyle}>
          {locations.map((location) => (
            <LocationItem key={location._id} location={location} />
          ))}
        </Grid>
      )}
    </Container>
  );
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  justifyContent: 'center',
  alignContent: 'center',
  gridRowGap: '20px',
  gridColumnGap: '50px',
  marginTop: '40px'
};

Locations.propTypes = {
  location: PropTypes.object.isRequired,
  getLocations: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  location: state.location
});

export default connect(mapStateToProps, { getLocations })(Locations);
