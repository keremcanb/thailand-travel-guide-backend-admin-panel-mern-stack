import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput, Row } from 'react-materialize';
import { filterLocations, clearFilter } from '../../store/actions/location';

const LocationFilter = () => {
  const text = useRef('');
  const dispatch = useDispatch();
  const filtered = useSelector((state) => state.location.filtered);

  useEffect(() => {
    if (!filtered) {
      text.current.value = '';
    }
  });

  const onChangeHandler = (e) => {
    if (text.current.value !== '') {
      dispatch(filterLocations(e.target.value));
    } else {
      dispatch(clearFilter());
    }
  };

  return (
    <Row className="row-grid filter">
      <TextInput ref={text} placeholder="Filter" onChange={onChangeHandler} />
    </Row>
  );
};

export default LocationFilter;
