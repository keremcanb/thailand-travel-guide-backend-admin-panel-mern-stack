import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-materialize';

const Message = ({ msg }) => {
  return <Row>{msg}</Row>;
};

Message.propTypes = {
  msg: PropTypes.string.isRequired
};

export default Message;
