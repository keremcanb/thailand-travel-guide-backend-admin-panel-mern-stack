import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row } from 'react-materialize';
import { getCurrentProfile } from '../../actions/profile';

const Dashboard = ({ getCurrentProfile, auth: { user } }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <Row className="mt-5 d-flex justify-content-center">
      <h1 className="mt-5">Welcome {user && user.firstName}</h1>
    </Row>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
