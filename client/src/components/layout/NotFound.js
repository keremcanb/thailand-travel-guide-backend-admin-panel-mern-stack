import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';

const NotFound = () => {
  return (
    <Container className='mt-5'>
      <Row className='justify-content-center'>
        <Col md={5}>
          <h1 className='x-large text-primary'>Page Not Found</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
