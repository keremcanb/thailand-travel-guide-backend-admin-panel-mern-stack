import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-materialize';

const Dashboard = ({ auth: { user } }) => {
  return (
    <div className="container row-style">
      <Row>
        <h1>Welcome {user && user.firstName}</h1>
      </Row>
    </div>
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
