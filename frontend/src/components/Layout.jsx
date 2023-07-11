import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => (
  <div className="d-flex flex-column h-100">
    <Navbar />
    <Outlet />
  </div>
);

export default Layout;
