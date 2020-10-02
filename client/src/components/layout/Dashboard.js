import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row } from 'react-materialize';

const Dashboard = ({ auth: { user } }) => {
  return (
    <Row className="row-grid">
      <h1>Welcome {user && user.firstName}</h1>
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
