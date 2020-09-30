import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-materialize';

const Dashboard = ({ auth: { user } }) => {
  return (
    <Row>
      <Col className="col s12 m6 offset-m3 l4 offset-l4">
        <h1>Welcome {user && user.firstName}</h1>
      </Col>
    </Row>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps)(Dashboard);
