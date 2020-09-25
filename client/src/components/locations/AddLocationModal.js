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
    if (title === '' || thumbnail === '') {
      M.toast({ html: 'Please enter location' });
    } else {
      addLocation(location);
      M.toast({ html: `Location added` });
      setLocation(initialFormState);
    }
  };

  const onChange = (e) => {
    setLocation({ ...location, [e.target.name]: e.target.value });
  };

  return (
    <Modal
      header="Add Location"
      id="Modal-0"
      options={{
        dismissible: true
      }}
      actions={[
        <>
          <Button
            onClick={onSubmit}
            node="button"
            waves="light"
            type="submit"
            style={{
              marginRight: '10px'
            }}
          >
            Submit
            <Icon right>send</Icon>
          </Button>
        </>
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
        name="title"
        placeholder="Title *"
        value={location.title}
        onChange={onChange}
        type="text"
        required
      />
      <TextInput
        name="thumbnail"
        placeholder="Thumbnail *"
        value={location.thumbnail}
        onChange={onChange}
        type="text"
        required
      />
    </Modal>
  );
};

AddLocationModal.propTypes = {
  addLocation: PropTypes.func.isRequired
};

export default connect(null, { addLocation })(AddLocationModal);
