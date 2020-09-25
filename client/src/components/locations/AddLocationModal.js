import React, { useState } from 'react';
import { Button, Icon, Modal, TextInput } from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLocation } from '../../actions/location';

const AddLocationModal = ({ addLocation }) => {
  const initialFormState = { title: '', thumbnail: '' };
  const [location, setLocation] = useState(initialFormState);
  const { title, thumbnail } = location;

  const onSubmit = () => {
    addLocation(location);
    M.toast({ html: `Location added` });
    setLocation(initialFormState);
  };

  const onChange = (e) => {
    setLocation({ ...location, [e.target.id]: e.target.value });
  };

  return (
    <Modal
      id="add-location-modal"
      actions={[
        <Button onClick={onSubmit} node="button" waves="light" type="submit">
          Submit
          <Icon right>send</Icon>
        </Button>
      ]}
      trigger={
        <Button
          className="blue darken-2"
          fab
          floating
          large
          node="button"
          icon={<Icon>add</Icon>}
        />
      }
    >
      <TextInput
        id="title"
        label="Title *"
        type="text"
        required
        value={title}
        onChange={onChange}
      />
      <TextInput
        id="thumbnail"
        label="Thumbnail *"
        type="text"
        required
        value={thumbnail}
        onChange={onChange}
      />
    </Modal>
  );
};

AddLocationModal.propTypes = {
  addLocation: PropTypes.func.isRequired
};

export default connect(null, { addLocation })(AddLocationModal);
