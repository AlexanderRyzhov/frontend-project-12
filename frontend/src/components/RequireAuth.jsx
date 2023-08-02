import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import routes from '../routes';

const RequireAuth = ({ children }) => {
  const auth = useAuthContext();

  if (!auth.user) {
    return <Navigate to={routes.loginPage()} />;
  }

  return children;
};

export default RequireAuth;
