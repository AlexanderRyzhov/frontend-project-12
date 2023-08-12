import { useSelector, useDispatch } from 'react-redux';
import { setModalInfo } from '../../slices/uiStateSlice';
import getModal from './index';

const ModalDialog = () => {
  const dispatch = useDispatch();
  const modalInfo = useSelector((state) => state.uiState.modalInfo);
  if (modalInfo.type === null) {
    return null;
  }
  const hideModal = () => {
    dispatch(setModalInfo({ type: null, channel: null }));
  };
  const Modal = getModal(modalInfo.type);
  return (
    <Modal
      modalInfo={modalInfo}
      hideModal={hideModal}
    />
  );
};

export default ModalDialog;
