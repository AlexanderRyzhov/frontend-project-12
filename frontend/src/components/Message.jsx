import filter from 'leo-profanity';

const Message = ({ message }) => {
  const text = filter.clean(message.body);
  return (
    <div className="text-break mb-2">
      <b>{message.username}</b>
      {': '}
      {text}
    </div>
  );
};

export default Message;
