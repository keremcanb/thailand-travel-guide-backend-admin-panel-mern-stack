import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Preloader } from 'react-materialize';

const Dashboard = () => {
  const auth = useSelector((state) => state.auth);
  const { user, loading } = auth;

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

export default Dashboard;
