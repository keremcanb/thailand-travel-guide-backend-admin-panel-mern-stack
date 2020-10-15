import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Preloader, Button, Icon } from 'react-materialize';
import { getPlaces } from '../../actions/place';
import PlaceItem from './PlaceItem';
import PlaceFilter from './PlaceFilter';

const Places = () => {
  const dispatch = useDispatch();

  const place = useSelector((state) => state.place);
  const { places, loading, filtered } = place;

  useEffect(() => {
    dispatch(getPlaces());
    document.title = 'Places';
  }, [dispatch]);

  return (
    <>
      <PlaceFilter />

      {places && !loading ? (
        <Row>
          <Col className="grid-style">
            {filtered
              ? filtered.map((place) => (
                  <PlaceItem key={place._id} place={place} />
                ))
              : places.map((place) => (
                  <PlaceItem key={place._id} place={place} />
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
      <Link to="addplace">
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

export default Places;
