/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/no-onchange */
import React, { useState, useEffect } from 'react';
// import TechSelectOptions from '../techs/TechSelectOptions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';
import { updateLog } from '../../actions/logActions';

const EditLogModal = ({ current, updateLog }) => {
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  useEffect(() => {
    if (current) {
      setTitle(current.title);
      setThumbnail(current.thumbnail);
    }
  }, [current]);

  const onSubmit = () => {
    if (title === '' || thumbnail === '') {
      M.toast({ html: 'Please enter title and thumbnail' });
    } else {
      updateLog({ title, thumbnail });
      M.toast({ html: `Location updated` });

      setTitle('');
      setThumbnail('');
    }
  };

  const modalStyle = {
    width: '70%',
    height: '60%',
    marginTop: '100px',
  };

  return (
    <div id='edit-log-modal' className='modal' style={modalStyle}>
      <div className='modal-content'>
        {/* <h4>Enter System Log</h4> */}
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

EditLogModal.propTypes = {
  current: PropTypes.object,
  updateLog: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  current: state.log.current,
});

export default connect(mapStateToProps, { updateLog })(EditLogModal);
