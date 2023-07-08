import axios from 'axios';
import { useLocalStorage } from './useLocalStorage';
import routes from '../routes';

export const useAuth = () => {    
  const [user, setUser] = useLocalStorage('user', null);

  const signIn = async (data) => {
      try {
          const response = await axios.post(routes.loginPath(), data);
          const userData = response.data;
          setUser(userData);
          return userData;
      } catch (err) {
          console.error(err);
      }
  };

  const signUp = async (data) => {
      try {
          let authresult = await axios.post('/api/auth/signup', data);
          let userObj = { ...authresult.data?.createdUser };
          userObj.token = authresult.data?.encodedToken;
          setUser(userObj);
      } catch (err) {
          console.error(err);
      }
  };

  const signOut = () => {
      setUser(null);
  };

  return { user, signIn, signUp, signOut };
};