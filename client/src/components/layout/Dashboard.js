import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-materialize';

const Dashboard = ({ auth: { user } }) => {
  const rowStyle = {
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30px'
  };

  return (
    <Row style={rowStyle}>
      <Col>
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
