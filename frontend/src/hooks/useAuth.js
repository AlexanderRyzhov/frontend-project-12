import axios from 'axios';
import useLocalStorage from './useLocalStorage';
import routes from '../routes';

const useAuth = () => {
  const [user, setUser] = useLocalStorage('user', null);

  const signIn = async (data) => {
    const response = await axios.post(routes.loginApiPath(), data);
    const userData = response.data;
    setUser(userData);
    return userData;
  };

  const signUp = async (data) => {
    const response = await axios.post(routes.signupApiPath(), data);
    const userData = response.data;
    setUser(userData);
    return userData;
  };

  const signOut = () => setUser(null);

  return {
    user, signIn, signUp, signOut,
  };
};

export default useAuth;
