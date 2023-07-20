import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Channel from './Channel';
import getModal from './modals/index';

const renderModal = (modalInfo, hideModal, channels) => {
  if (modalInfo.type === null) {
    return null;
  }
  const ModalDialog = getModal(modalInfo.type);
  return (
    <ModalDialog
      modalInfo={modalInfo}
      hideModal={hideModal}
      channels={channels}
    />
  );
};

const Channels = () => {
  const { t } = useTranslation();
  const [modalInfo, setModalInfo] = useState({ type: null, channel: null });
  const showModal = (type, channel = null) => {
    setModalInfo({ type, channel });
  };
  const hideModal = () => setModalInfo({ type: null, channel: null });

  const channels = useSelector((state) => {
    const allChannels = state.channels.ids.map((id) => state.channels.entities[id]);
    return allChannels;
  });
  const currentChannel = useSelector((state) => {
    const id = state.uiState.currentChannelId || state.uiState.defaultChannelId;
    return state.channels.entities[id];
  });

  return (
    <Col xs={4} md={2} className="border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels.channels')}</b>
        <Button variant="outline-primary" className="p-0 text-primary btn-group-vertical" onClick={() => showModal('adding')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
        </Button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => (
          <Channel
            key={channel.id}
            channel={channel}
            currentChannel={currentChannel}
            showModal={showModal}
          />
        ))}
      </ul>
      {renderModal(modalInfo, hideModal, channels)}
    </Col>
  );
};

export default Channels;
