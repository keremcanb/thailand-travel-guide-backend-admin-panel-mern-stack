/* eslint-disable import/extensions */
import React, { useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPlace } from '../../actions/place';

const AddPlaceModal = ({ addPlace }) => {
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  const modalStyle = {
    width: '70%',
    height: '60%',
    marginTop: '100px',
  };

  const onSubmit = () => {
    if (title === '' || thumbnail === '') {
      M.toast({ html: 'Please enter the first and last name' });
    } else {
      addPlace({ title, thumbnail });

      M.toast({ html: `${title} and ${thumbnail} added` });

      setTitle('');
      setThumbnail('');
    }
  };

  return (
    <div id='add-place-modal' className='modal' style={modalStyle}>
      <div className='modal-content'>
        {/* <h4>Enter System Place</h4> */}
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor='title' className='active'>
              Title
            </label>
          </div>
        </div>

        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='thumbnail'
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
            />
            <label htmlFor='thumbnail' className='active'>
              Thumbnail
            </label>
          </div>
        </div>
      </div>

      <div className='modal-footer'>
        <a
          href='#!'
          onClick={onSubmit}
          className='modal-close waves-effect blue waves-light btn'
        >
          Enter
        </a>
      </div>
    </div>
  );
};

AddPlaceModal.propTypes = {
  addPlace: PropTypes.func.isRequired,
};

export default connect(null, { addPlace })(AddPlaceModal);
