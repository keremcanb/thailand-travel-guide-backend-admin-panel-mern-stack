/* eslint-disable import/extensions */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';
import { addLocation } from '../../actions/location';

const AddLocationModal = ({ addLocation }) => {
  const [message, setMessage] = useState('');

  const onSubmit = () => {
    if (message === '') {
      M.toast({ html: 'Please enter a message and tech' });
    } else {
      const newLocation = {
        message,
      };

      addLocation(newLocation);

      M.toast({ html: `Location added` });

      // Clear Fields
      setMessage('');
    }
  };

  return (
    <div id='add-location-modal' className='modal' style={modalStyle}>
      <div className='modal-content'>
        <h4>Enter System Location</h4>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <label htmlFor='message' className='active'>
              Location Message
            </label>
          </div>
        </div>

        <div className='row'>
          <div className='input-field'>
            <p>
              <label>
                <input
                  type='checkbox'
                  className='filled-in'
                  // checked={attention}
                  // value={attention}
                  // onChange={() => setAttention(!attention)}
                />
                <span>Needs Attention</span>
              </label>
            </p>
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

AddLocationModal.propTypes = {
  addLocation: PropTypes.func.isRequired,
};

const modalStyle = {
  width: '75%',
  height: '75%',
};

export default connect(null, { addLocation })(AddLocationModal);
