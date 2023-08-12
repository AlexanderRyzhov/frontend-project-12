import React, {
  createContext,
  useContext,
  useMemo,
} from 'react';

export const SocketContext = createContext();

export const SocketApiProvider = ({ socket, children }) => {
  const sendMessageTimeout = 5000;

  const api = useMemo(() => ({
    newMessage: (newMessage) => socket
      .timeout(sendMessageTimeout)
      .emitWithAck('newMessage', newMessage),
    newChannel: (newChannel) => (socket
      .timeout(sendMessageTimeout)
      .emitWithAck('newChannel', newChannel)),
    removeChannel: (channel) => (socket
      .timeout(sendMessageTimeout)
      .emitWithAck('removeChannel', channel)),
    renameChannel: (modifiedChannel) => (socket
      .timeout(sendMessageTimeout)
      .emitWithAck('renameChannel', modifiedChannel)),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), []);

  return (
    <SocketContext.Provider value={api}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketApi = () => useContext(SocketContext);
