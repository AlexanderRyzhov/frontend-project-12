import filter from 'leo-profanity';

const Message = ({ message }) => {
  // in this state,
// the "filter" only use "english" dictionary by default
  filter.list();

  // remove all bad words from the filter
  // now the filter can't filter anything cause there are no bad words
  filter.clearList();

  // adding word (from builtin dictionary) into the filter
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('fr'));
  filter.add(filter.getDictionary('ru'));
  // filter.loadDictionary('ru');
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
