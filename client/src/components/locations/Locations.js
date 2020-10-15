import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Preloader, Button, Icon } from 'react-materialize';
import { getLocations } from '../../actions/location';
import LocationItem from './LocationItem';
import LocationFilter from './LocationFilter';

const Locations = () => {
  const dispatch = useDispatch();

  const location = useSelector((state) => state.location);
  const { locations, loading, filtered } = location;

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
        <Preloader
          className="loader"
          active
          color="blue"
          flashing={false}
          size="big"
        />
      )}
      <Link to="addlocation">
        <Button
          className="blue darken-2"
          fab
          floating
          large
          node="button"
          icon={<Icon>add</Icon>}
        />
      </Link>
    </>
  );
};

export default Locations;
