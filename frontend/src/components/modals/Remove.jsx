import {
  Modal, FormGroup, Button,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import socket from '../../socket';

const Remove = ({ hideModal, modalInfo }) => {
  const { channel } = modalInfo;
  return (
    <Modal show centered onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Удаление канала</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const sendMessageTimeout = 5000;
            if (!channel) {
              toast.error('chennel is not defined');
              return;
            }
            socket.timeout(sendMessageTimeout).emit('removeChannel', channel, (err) => {
              if (err) {
                toast.error('не удалось удалить канал');
              } else {
                toast.success('канал удален');
                hideModal();
              }
            });
          }}
        >
          <FormGroup>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" type="button" onClick={hideModal} className="me-2">
                отменить
              </Button>
              <Button variant="danger" type="submit">
                удалить
              </Button>
            </div>
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
