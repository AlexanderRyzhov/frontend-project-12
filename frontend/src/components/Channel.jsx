import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setCurrentChannelId } from '../slices/uiStateSlice';

const Channel = ({
  channel, currentChannel, showModal, currentChannelRef,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const buttonVariant = (channel.id === currentChannel?.id) ? 'secondary' : 'light';
  return (
    <li className="nav-item w-100" ref={currentChannelRef}>
      <Dropdown
        as={ButtonGroup}
        className="d-flex"
      >
        <Button
          variant={buttonVariant}
          onClick={() => (dispatch(setCurrentChannelId(channel.id)))}
          className="w-100 rounded-0 text-start text-truncate"
        >
          {`# ${channel.name}`}
        </Button>
        { channel.removable
          ? (
            <>
              <Dropdown.Toggle split variant={buttonVariant} className="rounded-0">
                <span className="visually-hidden">{t('channel.manage')}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => showModal('removing', channel)}>{t('channel.remove')}</Dropdown.Item>
                <Dropdown.Item onClick={() => showModal('renaming', channel)}>{t('channel.rename')}</Dropdown.Item>
              </Dropdown.Menu>
            </>
          )
          : null}
      </Dropdown>
    </li>
  );
};

export default Channel;
