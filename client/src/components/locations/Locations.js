import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-materialize';
import { getLocations } from '../../actions/location';
import LocationItem from './LocationItem';
import LocationFilter from './LocationFilter';
import Loader from '../layout/Loader';
import Fab from '../layout/Fab';

const Locations = () => {
  const location = useSelector((state) => state.location);
  const { locations, loading, filtered } = location;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLocations());
    document.title = 'Locations';
  }, [dispatch]);

  return (
    <>
      <LocationFilter />
      {locations && !loading ? (
        <Row>
          <Col className="grid-style">
            {filtered
              ? filtered.map((item) => (
                  <LocationItem key={item._id} location={item} />
                ))
              : locations.map((item) => (
                  <LocationItem key={item._id} location={item} />
                ))}
          </Col>
        </Row>
      ) : (
        <Loader />
      )}
      <Link to="addlocation">
        <Fab />
      </Link>
    </>
  );
};

export default Locations;
