import {
  Modal, FormGroup, Button,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useSocketApi } from '../../contexts/SocketContext';

const Remove = ({ hideModal, modalInfo }) => {
  const { t } = useTranslation();
  const api = useSocketApi();
  const { channel } = modalInfo;
  return (
    <Modal show centered onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.remove.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            try {
              api.removeChannel(channel);
              toast.success(t('modals.remove.removeChannelSuccess'));
              hideModal();
            } catch (err) {
              toast.error(t('modals.remove.removeChannelError'));
            }
          }}
        >
          <FormGroup>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" type="button" onClick={hideModal} className="me-2">
                {t('modals.remove.cancel')}
              </Button>
              <Button variant="danger" type="submit">
                {t('modals.remove.remove')}
              </Button>
            </div>
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
