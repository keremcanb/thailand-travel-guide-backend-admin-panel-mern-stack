import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Icon, Modal, TextInput } from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import { updateLocation } from '../../actions/location';

const EditLocationModal = ({ current, updateLocation }) => {
  const [location, setLocation] = useState('');
  const { title, thumbnail } = location;

  useEffect(() => {
    if (current) {
      setLocation(current);
    }
  }, [current]);

  const onChange = (e) => {
    setLocation({ ...location, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    updateLocation(location);
    M.toast({ html: 'Location updated' });
  };

  return (
    <Modal
      id="edit-location-modal"
      actions={[
        <Button onClick={onSubmit} node="button" type="submit">
          Update
          <Icon right>send</Icon>
        </Button>
      ]}
    >
      <TextInput
        id="edit-loc-title"
        name="title"
        label="Title"
        value={title}
        onChange={onChange}
      />
      <TextInput
        id="edit-loc-thumb"
        name="thumbnail"
        label="Thumbnail"
        value={thumbnail}
        onChange={onChange}
      />
    </Modal>
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
