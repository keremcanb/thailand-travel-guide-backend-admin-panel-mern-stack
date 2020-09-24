import React from 'react';
import { Row, Col } from 'react-materialize';

const NotFound = () => {
  return (
    <Row className="justify-content-center mt-5">
      <Col md={5}>
        <h1 className="x-large text-primary">Page Not Found</h1>
      </Col>
    </Row>
  );
};

export default NotFound;
