import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';
import { updateLocation } from '../../actions/location';
// import TechSelectOptions from '../techs/TechSelectOptions';

const EditLocationModal = ({ current, updateLocation }) => {
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
      const updLocation = {
        id: current.id,
        title,
        thumbnail
      };

      updateLocation(updLocation);
      M.toast({ html: `Location updated` });

      setTitle('');
      setThumbnail('');
    }
  };

  return (
    <div
      id="edit-location-modal"
      className="modal"
      // style={{ width: '70%', height: '60%', marginTop: '50px' }}
    >
      <div className="modal-content">
        {/* <h4>Enter System Location</h4> */}
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="title" className="active">
              Title
            </label>
          </div>
        </div>

        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="thumbnail"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
            />
            <label htmlFor="thumbnail" className="active">
              Thumbnail
            </label>
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <a
          href="#!"
          onClick={onSubmit}
          className="modal-close waves-effect blue waves-light btn"
        >
          Enter
        </a>
      </div>
    </div>
  );
};

EditLocationModal.propTypes = {
  current: PropTypes.object,
  updateLocation: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  current: state.location.current
});

export default connect(mapStateToProps, { updateLocation })(EditLocationModal);
