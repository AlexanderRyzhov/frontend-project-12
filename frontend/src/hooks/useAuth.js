import axios from 'axios';
import useLocalStorage from './useLocalStorage';
import routes from '../routes';

const useAuth = () => {
  const [user, setUser] = useLocalStorage('user', null);

  const signIn = async (data) => {
    try {
      const response = await axios.post(routes.loginPath(), data);
      const userData = response.data;
      setUser(userData);
      return userData;
    } catch (err) {
      return console.error(err);
    }
  };

  const signUp = async (data) => {
    try {
      const response = await axios.post('/api/auth/signup', data);
      const userData = response.data;
      return setUser(userData);
    } catch (err) {
      return console.error(err);
    }
  };

  const signOut = () => setUser(null);

  return {
    user, signIn, signUp, signOut,
  };
};

export default useAuth;
