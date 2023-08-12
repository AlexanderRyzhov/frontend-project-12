import io from 'socket.io-client';
import { toast } from 'react-toastify';
import store from './slices/index';
import { addChannel, removeChannel, renameChannel } from './slices/channelsSlice';
import { addMessage } from './slices/messagesSlice';

const { dispatch } = store;

const onNewMessageEvent = (message) => {
  dispatch(addMessage(message));
};

const onNewChannelEvent = (channel) => {
  dispatch(addChannel(channel));
};

const onRemoveChannelEvent = (channel) => {
  const { id } = channel;
  dispatch(removeChannel(id));
};

const onRenameChannelEvent = (channel) => {
  const { id } = channel;
  const changes = channel;
  dispatch(renameChannel({ id, changes }));
};

const initSocket = (i18n) => {
  const { t } = i18n;
  const socket = io();
  socket.on('connect', () => {
    toast.success(t('mainPage.onConnect'));
  });

  socket.on('disconnect', () => {
    toast.error(t('mainPage.onDisconnect'));
  });

  socket.on('error', (err) => {
    console.log('Socket Error:', err.message);
  });

  socket.on('newMessage', onNewMessageEvent);
  socket.on('newChannel', onNewChannelEvent);
  socket.on('removeChannel', onRemoveChannelEvent);
  socket.on('renameChannel', onRenameChannelEvent);

  return socket;
};

export default initSocket;
