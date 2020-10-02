import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Icon, TextInput, Row } from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import { updateLocation } from '../../actions/location';

const EditLocation = ({ current, updateLocation, history }) => {
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
    history.push('locations');
  };

  return (
    <div className="container row-style">
      <Row>
        <form>
          <TextInput
            id="edit-loc-title"
            name="title"
            label="Title"
            value={title}
            onChange={onChange}
            s={12}
          />
          <TextInput
            id="edit-loc-thumb"
            name="thumbnail"
            label="Thumbnail"
            value={thumbnail}
            onChange={onChange}
            s={12}
          />
          <Button
            onClick={onSubmit}
            variant="contained"
            color="primary"
            className="right"
            type="submit"
          >
            Update
            <Icon right>send</Icon>
          </Button>
        </form>
      </Row>
    </div>
  );
};

EditLocation.propTypes = {
  current: PropTypes.object.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  updateLocation: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  current: state.location.current
});

export default connect(mapStateToProps, { updateLocation })(EditLocation);
