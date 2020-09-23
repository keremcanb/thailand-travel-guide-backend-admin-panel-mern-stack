import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import PlaceItem from './PlaceItem';
import { getPlaces } from '../../actions/place';

const Places = ({ getPlaces, place: { places, loading } }) => {
  useEffect(() => {
    getPlaces();
  }, [getPlaces]);

  return loading || places === null ? (
    <LinearProgress />
  ) : (
    <Container>
      {!loading && places.length === 0 ? (
        <p className="center">No places to show...</p>
      ) : (
        <Grid style={gridStyle}>
          {places.map((place) => (
            <PlaceItem key={place._id} place={place} />
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
Places.propTypes = {
  place: PropTypes.object.isRequired,
  getPlaces: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  place: state.place
});

export default connect(mapStateToProps, { getPlaces })(Places);
