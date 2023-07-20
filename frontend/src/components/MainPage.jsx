import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';

import routes from '../routes';
import {
  setChannels, addChannel, removeChannel, renameChannel,
} from '../slices/channelsSlice';
import { setDefaultChannelId } from '../slices/uiStateSlice';
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

const MainPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: getAuthHeader(),
        };
        const { data } = await axios.get(routes.getData(), config);
        const { channels, messages, currentChannelId } = data;
        dispatch(setChannels(channels));
        dispatch(setDefaultChannelId(currentChannelId));
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
      toast.success(t('mainPage.onConnect'));
    }

    function onDisconnect() {
      toast.success(t('mainPage.onDisconnect'));
    }

    function onNewMessageEvent(message) {
      dispatch(addMessage(message));
    }

    function onNewChannelEvent(channel) {
      dispatch(addChannel(channel));
    }

    function onRemoveChannelEvent(channel) {
      const { id } = channel;
      dispatch(removeChannel(id));
    }

    function onRenameChannelEvent(channel) {
      const { id } = channel;
      const changes = channel;
      dispatch(renameChannel({ id, changes }));
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('newMessage', onNewMessageEvent);
    socket.on('newChannel', onNewChannelEvent);
    socket.on('removeChannel', onRemoveChannelEvent);
    socket.on('renameChannel', onRenameChannelEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('newMessage', onNewMessageEvent);
      socket.off('newChannel', onNewChannelEvent);
      socket.off('removeChannel', onRemoveChannelEvent);
      socket.off('renameChannel', onRenameChannelEvent);
    };
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
