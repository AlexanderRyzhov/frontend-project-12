import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setCurrentChannelId } from '../slices/channelsSlice';

const Channel = ({ channel, currentChannel }) => {
  const dispatch = useDispatch();
  const buttonVariant = (channel.id === currentChannel?.id) ? 'secondary' : 'light';
  return (
    <li className="nav-item w-100">
      <Dropdown as={ButtonGroup} className="d-flex">
        <Button
          variant={buttonVariant}
          onClick={() => (dispatch(setCurrentChannelId(channel.id)))}
          className="w-100 rounded-0 text-start"
        >
          {channel.name}
        </Button>
        {/* {channel.removable */}
        { channel.id === 1
          ? (
            <>
              <Dropdown.Toggle split variant={buttonVariant} className="rounded-0" />
              <Dropdown.Menu>
                <Dropdown.Item>Удалить</Dropdown.Item>
                <Dropdown.Item>Переименовать</Dropdown.Item>
              </Dropdown.Menu>
            </>
          )
          : null}
      </Dropdown>
    </li>
  );
};

export default Channel;
