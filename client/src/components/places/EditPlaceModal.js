import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';
import { updatePlace } from '../../actions/place';
// import TechSelectOptions from '../techs/TechSelectOptions';

const EditPlaceModal = ({ current, updatePlace }) => {
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  const modalStyle = {
    width: '70%',
    height: '60%',
    marginTop: '100px'
  };

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
      const updPlace = {
        id: current.id,
        title,
        thumbnail
      };

      updatePlace(updPlace);
      M.toast({ html: `Location updated` });

      setTitle('');
      setThumbnail('');
    }
  };

  return (
    <div id="edit-place-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        {/* <h4>Enter System Place</h4> */}
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

EditPlaceModal.propTypes = {
  current: PropTypes.object,
  updatePlace: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  current: state.place.current
});

export default connect(mapStateToProps, { updatePlace })(EditPlaceModal);
