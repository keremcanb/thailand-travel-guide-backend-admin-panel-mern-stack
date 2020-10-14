import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Preloader, Button, Icon } from 'react-materialize';
import { Link } from 'react-router-dom';
import LocationItem from './LocationItem';
import { getLocations } from '../../actions/location';
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
              ? filtered.map((loc) => (
                  <LocationItem key={loc._id} location={loc} />
                ))
              : locations.map((loc) => (
                  <LocationItem key={loc._id} location={loc} />
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
