import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput, Row } from 'react-materialize';
import { filterPlaces, clearFilter } from '../../actions/place';

const PlaceFilter = () => {
  const dispatch = useDispatch();

  const filtered = useSelector((state) => state.place.filtered);

  const text = useRef('');

  useEffect(() => {
    if (!filtered) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      dispatch(filterPlaces(e.target.value));
    } else {
      dispatch(clearFilter());
    }
  };

  return (
    <Row className="row-grid filter">
      <TextInput ref={text} placeholder="Filter" onChange={onChange} />
    </Row>
  );
};

export default PlaceFilter;
