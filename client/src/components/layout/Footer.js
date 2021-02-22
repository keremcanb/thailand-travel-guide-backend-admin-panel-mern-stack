import { useSelector } from 'react-redux';
import { Row, Col } from 'react-materialize';
import Loader from '../utils/Loader';

const Footer = () => {
  const auth = useSelector((state) => state.auth);
  const { loading } = auth;

  return !loading ? (
    <footer>
      <Row
        className="row-grid"
        style={{ height: '5rem', marginTop: '10px', marginBottom: '0', backgroundColor: '#3F51B5' }}
      >
        <Col>Copyright &copy; </Col>
      </Row>
    </footer>
  ) : (
    <Loader />
  );
};

export default Footer;
