import { Outlet } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import Navbar from './Navbar';

const Layout = () => (
  <div className="d-flex flex-column h-100">
    <Navbar />
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Outlet />
        </div>
      </Row>
    </Container>
  </div>
);

export default Layout;
