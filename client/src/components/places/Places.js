import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-materialize';
import { getPlaces } from '../../actions/place';
import PlaceItem from './PlaceItem';
import PlaceFilter from './PlaceFilter';
import Loader from '../layout/Loader';
import Fab from '../layout/Fab';

const Places = () => {
  const place = useSelector((state) => state.place);
  const { places, loading, filtered } = place;

  const dispatch = useDispatch();

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
        <Loader />
      )}
      <Link to="addplace">
        <Fab />
      </Link>
    </>
  );
};

export default Places;
