import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import routes from '../routes';
import { setChannels, setCurrentChannelId } from '../slices/channelsSlice';
import { setMessages, addMessage } from '../slices/messagesSlice';
import Channels from './Channels';
import Messages from './Messages';
import socket from '../socket';

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }
  return {};
};

const getNormalized = ({ channels, messages, currentChannelId }) => {
  const channelsEntities = channels.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});
  const channelsIds = channels.map((item) => item.id);

  const messagesEntities = messages.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});
  const messagesIds = messages.map((item) => item.id);

  return {
    channels: {
      entities: channelsEntities,
      ids: channelsIds,
    },
    messages: {
      entities: messagesEntities,
      ids: messagesIds,
    },
    currentChannelId,
  };
};

const MainPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: getAuthHeader(),
        };
        const { data } = await axios.get(routes.getData(), config);
        const { channels, messages, currentChannelId } = getNormalized(data);
        dispatch(setChannels(channels));
        dispatch(setCurrentChannelId(currentChannelId));
        dispatch(setMessages(messages));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function onConnect() {
      toast.success('связь с сервером установлена');
    }

    function onDisconnect() {
      toast.error('связь с сервером потеряна');
    }

    function onNewMessageEvent(message) {
      dispatch(addMessage({ message }));
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('newMessage', onNewMessageEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('newMessage', onNewMessageEvent);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
        <ToastContainer />
      </Row>
    </Container>
  );
};

export default MainPage;
