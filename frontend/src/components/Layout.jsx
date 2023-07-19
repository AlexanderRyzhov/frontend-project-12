import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './Header';

const Layout = () => (
  <div className="d-flex flex-column h-100">
    <Header />
    <Outlet />
    <ToastContainer />
  </div>
);

export default Layout;
