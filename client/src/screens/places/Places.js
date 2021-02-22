import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-materialize';
import { Helmet } from 'react-helmet';
import { getPlaces } from '../../store/actions/place';
import PlaceItem from './PlaceItem';
import PlaceFilter from './PlaceFilter';
import Loader from '../../components/utils/Loader';
import Fab from '../../components/utils/Fab';

const Places = () => {
  const dispatch = useDispatch();
  const place = useSelector((state) => state.place);
  const { places, loading, filtered } = place;

  useEffect(() => {
    dispatch(getPlaces());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Places</title>
      </Helmet>
      <PlaceFilter />
      {places && !loading ? (
        <Row>
          <Col className="grid-style">
            {filtered
              ? filtered.map((place) => <PlaceItem key={place._id} place={place} />)
              : places.map((place) => <PlaceItem key={place._id} place={place} />)}
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
