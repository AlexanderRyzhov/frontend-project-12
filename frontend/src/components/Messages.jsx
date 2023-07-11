/* eslint-disable max-len */
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import Message from './Message';
import NewMessageForm from './NewMessageForm';

const Messages = () => {
  const messages = useSelector((state) => {
    const allMessages = state.messages.ids.map((id) => state.messages.entities[id]);
    const filteredMessages = allMessages.filter(({ channelId }) => channelId === state.channels.currentChannelId);
    return filteredMessages;
  });
  const currentChannel = useSelector((state) => (
    state.channels.entities[state.channels.currentChannelId]));

  return (currentChannel)
    ? (
      <Col className="p-0 h-100">
        <div className="d-flex flex-column h-100">
          <div className="bg-light mb-4 p-3 shadow-sm small">
            <p className="m-0"><b>{`# ${currentChannel.name}`}</b></p>
            <span className="text-muted">{`${messages.length} сообщение`}</span>
          </div>
          <div id="messages-box" className="chat-messages overflow-auto px-5 ">
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
          </div>
          <NewMessageForm />
        </div>
      </Col>
    )
    : null;
};

export default Messages;
