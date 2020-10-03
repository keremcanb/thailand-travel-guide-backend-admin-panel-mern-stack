import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Preloader } from 'react-materialize';

const Dashboard = ({ auth: { user, loading } }) => {
  return !loading && user ? (
    <Row className="center">
      <h1>Welcome {user.firstName}</h1>
      <img className="circle" src={user.avatar} alt="" />
    </Row>
  ) : (
    <Preloader
      className="loader"
      active
      color="blue"
      flashing={false}
      size="big"
    />
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
