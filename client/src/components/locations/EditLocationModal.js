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

  const onSubmit = () => {
    updateLocation(location);
    M.toast({ html: 'Location updated' });
  };

  const onChange = (e) => {
    setLocation({ ...location, [e.target.id]: e.target.value });
  };

  return (
    <Modal
      id="edit-location-modal"
      actions={[
        <Button onClick={onSubmit} node="button" waves="light" type="submit">
          Submit
          <Icon right>send</Icon>
        </Button>
      ]}
    >
      <TextInput
        id="title"
        label="Title"
        type="text"
        value={title}
        onChange={onChange}
      />
      <TextInput
        id="thumbnail"
        label="Thumbnail"
        type="text"
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
