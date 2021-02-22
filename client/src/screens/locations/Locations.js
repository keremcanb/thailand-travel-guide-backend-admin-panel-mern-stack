import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-materialize';
import { Helmet } from 'react-helmet';
import { getLocations } from '../../store/actions/location';
import LocationItem from './LocationItem';
import LocationFilter from './LocationFilter';
import Loader from '../../components/utils/Loader';
import Fab from '../../components/utils/Fab';

const Locations = () => {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.location);
  const { locations, loading, filtered } = location;

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
              ? filtered.map((item) => <LocationItem key={item._id} location={item} />)
              : locations.map((item) => <LocationItem key={item._id} location={item} />)}
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
