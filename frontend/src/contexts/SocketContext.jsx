import React, {
  createContext,
  useContext,
  useRef,
  useEffect,
  useState,
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

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
