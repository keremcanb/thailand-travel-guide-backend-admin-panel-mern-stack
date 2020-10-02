import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, ProgressBar } from 'react-materialize';

const Dashboard = ({ auth: { user, loading } }) => {
  return !loading ? (
    <Row className="center">
      <h1>Welcome {user && user.firstName}</h1>
      {user && <img className="circle" src={user.avatar} alt="" />}
    </Row>
  ) : (
    <ProgressBar className="blue" />
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
