import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import routes from '../routes';
import { setChannels, setCurrentChannelId } from '../slices/channelsSlice';
import { setMessages } from '../slices/messagesSlice';
import Channels from './Channels';
import Messages from './Messages';

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

  const fakeMessages = [
    {
      body: '1',
      channelId: 1,
      username: 'admin',
      id: 1,
    },
    {
      body: '2',
      channelId: 1,
      username: 'admin',
      id: 2,
    },
    {
      body: '3',
      channelId: 1,
      username: 'admin',
      id: 3,
    },
    {
      body: '555',
      channelId: 2,
      username: 'admin',
      id: 4,
    },
    {
      body: '8888',
      channelId: 2,
      username: 'admin',
      id: 5,
    },
  ];

  const messagesEntities = [...fakeMessages, ...messages]
    .reduce((acc, item) => ({ ...acc, [item.id]: item }), {});
  const messagesIds = [...fakeMessages, ...messages]
    .map((item) => item.id);

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
