import React, { useState } from 'react';
import { Button, Icon, Modal, TextInput } from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPlace } from '../../actions/place';

const AddPlaceModal = ({ addPlace }) => {
  const initialFormState = { title: '', thumbnail: '' };
  const [place, setPlace] = useState(initialFormState);
  const { title, thumbnail } = place;

  const onSubmit = () => {
    if (title === '' || thumbnail === '') {
      M.toast({ html: 'Please enter place' });
    } else {
      addPlace(place);
      M.toast({ html: `Place added` });
      setPlace(initialFormState);
    }
  };

  const onChange = (e) => {
    setPlace({ ...place, [e.target.name]: e.target.value });
  };

  return (
    <Modal
      header="Add Place"
      bottomSheet={false}
      fixedFooter={false}
      id="Modal-0"
      options={{
        dismissible: true,
        endingTop: '10%',
        inDuration: 250,
        onCloseEnd: null,
        onCloseStart: null,
        onOpenEnd: null,
        onOpenStart: null,
        opacity: 0.5,
        outDuration: 250,
        preventScrolling: true,
        startingTop: '4%'
      }}
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
          <Button modal="close" node="button" waves="green">
            Close
          </Button>
        </>
      ]}
    >
      <TextInput
        name="title"
        placeholder="Title *"
        value={place.title}
        onChange={onChange}
        type="text"
        required
      />
      <TextInput
        name="thumbnail"
        placeholder="Thumbnail *"
        value={place.thumbnail}
        onChange={onChange}
        type="text"
        required
      />
    </Modal>
  );
};

AddPlaceModal.propTypes = {
  addPlace: PropTypes.func.isRequired
};

export default connect(null, { addPlace })(AddPlaceModal);
