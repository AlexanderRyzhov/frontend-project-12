import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';

import Channels from './Channels';
import Messages from './Messages';
import routes from '../routes';
import { useAuthContext } from '../contexts/AuthContext';
import { setChannels } from '../slices/channelsSlice';
import { setMessages } from '../slices/messagesSlice';
import { setCurrentChannelId } from '../slices/uiStateSlice';

const getAuthHeader = (user) => {
  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }
  return {};
};

const MainPage = () => {
  const { user, signOut } = useAuthContext();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: getAuthHeader(user),
        };
        const { data } = await axios.get(routes.getData(), config);
        const { channels, messages, currentChannelId } = data;
        dispatch(setChannels(channels));
        dispatch(setCurrentChannelId(currentChannelId));
        dispatch(setMessages(messages));
      } catch (error) {
        const unauthorized = 401;
        if (error.name === 'AxiosError' && error.response.status === unauthorized) {
          signOut();
        }
        console.log(error);
        toast.error(t('mainPage.fetchDataError'));
      }
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </Row>
    </Container>
  );
};

export default MainPage;
