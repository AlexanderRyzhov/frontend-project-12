import React, { useEffect, useRef } from 'react';
import { Formik } from 'formik';
import {
  Modal, FormGroup, FormControl, Button,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setMyChannelId } from '../../slices/uiStateSlice';
import socket from '../../socket';

const Add = ({ hideModal, channels }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Formik
      validateOnBlur={false}
      // validateOnChange={false}
      initialValues={{ name: '' }}
      validate={(values) => {
        const errors = {};
        if (!values.name) {
          errors.name = 'Укажите имя канала';
        } else {
          const index = channels.findIndex((channel) => (channel.name === values.name));
          if (index >= 0) {
            errors.name = 'Данное имя канала уже занято';
          }
        }
        return errors;
      }}
      onSubmit={({ name }, { setSubmitting }) => {
        const sendMessageTimeout = 5000;
        const channel = { name };
        socket.timeout(sendMessageTimeout).emit('newChannel', channel, (err, response) => {
          if (err) {
            toast.error('не удалось создать канал');
            setSubmitting(false);
          } else {
            const { data } = response;
            toast.success('новый канал создан');
            dispatch(setMyChannelId(data.id));
            hideModal();
          }
        });
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <Modal show centered onHide={hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Новый канал</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <FormControl
                  ref={inputRef}
                  name="name"
                  id="name"
                  type="text"
                  placeholder="Имя канала"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  className="mb-2"
                  disabled={isSubmitting}
                  isInvalid={touched.name && errors.name}
                />
                {errors.name && touched.name
              && <FormControl.Feedback type="invalid">{errors.name}</FormControl.Feedback>}
                <div className="d-flex justify-content-end">
                  <Button variant="secondary" type="button" onClick={hideModal} className="me-2">
                    отменить
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting || (errors.name && touched.name)}
                  >
                    отправить
                  </Button>
                </div>
              </FormGroup>
            </form>
          </Modal.Body>
        </Modal>
      )}
    </Formik>
  );
};

export default Add;
