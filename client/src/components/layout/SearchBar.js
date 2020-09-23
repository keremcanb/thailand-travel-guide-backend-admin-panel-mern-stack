import React, { useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchLocations } from '../../actions/location';

const SearchBar = ({ searchLocations }) => {
  const text = useRef('');

  const onChange = () => {
    searchLocations(text.current.value);
  };

  return (
    <nav style={{ marginBottom: '30px', marginTop: '75px' }} className='blue'>
      <div className='nav-wrapper'>
        <form>
          <div className='input-field'>
            <input
              ref={text}
              onChange={onChange}
              id='search'
              type='search'
              placeholder='Search...'
            />
            <label className='label-icon' htmlFor='search'>
              <i className='material-icons'>search</i>
            </label>
            <i className='material-icons'>close</i>
          </div>
        </form>
      </div>
    </nav>
  );
};

SearchBar.propTypes = {
  searchLocations: PropTypes.func.isRequired,
};

export default connect(null, { searchLocations })(SearchBar);
