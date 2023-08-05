import React, {
  createContext,
  useContext,
  useRef,
  useEffect,
  useState,
  useMemo,
} from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import io from 'socket.io-client';

import { addChannel, removeChannel, renameChannel } from '../slices/channelsSlice';
import { addMessage } from '../slices/messagesSlice';

export const SocketContext = createContext();

export const SocketProvider = ({ children, store }) => {
  const { t } = useTranslation();

  const onNewMessageEvent = (message) => {
    store.dispatch(addMessage(message));
  };

  const onNewChannelEvent = (channel) => {
    store.dispatch(addChannel(channel));
  };

  const onRemoveChannelEvent = (channel) => {
    const { id } = channel;
    store.dispatch(removeChannel(id));
  };

  const onRenameChannelEvent = (channel) => {
    const { id } = channel;
    const changes = channel;
    store.dispatch(renameChannel({ id, changes }));
  };

  const [isConnected, setConnected] = useState(false);

  const socket = useRef(null);

  useEffect(() => {
    if (!isConnected) {
      socket.current = io();

      socket.current.on('connect', () => {
        toast.success(t('mainPage.onConnect'));
        setConnected(true);
      });

      socket.current.on('disconnect', () => {
        toast.error(t('mainPage.onDisconnect'));
        setConnected(false);
      });

      socket.current.on('error', (err) => {
        console.log('Socket Error:', err.message);
      });

      socket.current.on('newMessage', onNewMessageEvent);
      socket.current.on('newChannel', onNewChannelEvent);
      socket.current.on('removeChannel', onRemoveChannelEvent);
      socket.current.on('renameChannel', onRenameChannelEvent);
    }

    return () => {
      if (socket.current && socket.current.connected) {
        socket.current.disconnect();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessageTimeout = 5000;

  const api = useMemo(() => ({
    newMessage: (newMessage) => socket.current
      .timeout(sendMessageTimeout)
      .emitWithAck('newMessage', newMessage),
    newChannel: (newChannel) => (socket.current
      .timeout(sendMessageTimeout)
      .emitWithAck('newChannel', newChannel)),
    removeChannel: (channel) => (socket.current
      .timeout(sendMessageTimeout)
      .emitWithAck('removeChannel', channel)),
    renameChannel: (modifiedChannel) => (socket.current
      .timeout(sendMessageTimeout)
      .emitWithAck('renameChannel', modifiedChannel)),
  }), []);

  return (
    <SocketContext.Provider value={api}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketApi = () => useContext(SocketContext);
