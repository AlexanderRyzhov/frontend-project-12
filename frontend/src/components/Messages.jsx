import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Message from './Message';
import NewMessageForm from './NewMessageForm';

const Messages = () => {
  const { t } = useTranslation();
  const currentChannelId = useSelector((state) => state.uiState.currentChannelId ?? 0);

  const messages = useSelector((state) => {
    const allMessages = state.messages.ids.map((id) => state.messages.entities[id]);
    return allMessages.filter(({ channelId }) => channelId === currentChannelId);
  });

  const currentChannel = useSelector((state) => (
    state.channels.entities[currentChannelId]
  ));

  const user = JSON.parse(localStorage.getItem('user'));
  const username = user?.username;

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (currentChannel)
    ? (
      <Col className="p-0 h-100">
        <div className="d-flex flex-column h-100">
          <div className="bg-light mb-4 p-3 shadow-sm small">
            <p className="m-0"><b>{`# ${currentChannel.name}`}</b></p>
            <span className="text-muted">{t('messages.messages', { count: messages.length })}</span>
          </div>
          <div id="messages-box" className="chat-messages overflow-auto px-5 ">
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
          <NewMessageForm channelId={currentChannel.id} username={username} />
        </div>
      </Col>
    )
    : null;
};

export default Messages;
