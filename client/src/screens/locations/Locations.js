import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-materialize';
import { Helmet } from 'react-helmet';
import { getLocations } from '../../store/actions/location';
import LocationItem from './LocationItem';
import LocationFilter from './LocationFilter';
import Loader from '../../components/layout/Loader';
import Fab from '../../components/layout/Fab';

const Locations = () => {
  const location = useSelector((state) => state.location);
  const { locations, loading, filtered } = location;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLocations());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Locations</title>
      </Helmet>
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
