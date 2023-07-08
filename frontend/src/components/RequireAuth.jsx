import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

const RequireAuth = ({ children }) => {
  const auth = useAuthContext();

  if (!auth.user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default RequireAuth;
