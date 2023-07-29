import React, { useEffect, useRef } from 'react';
import { Formik } from 'formik';
import {
  Modal, FormGroup, FormControl, Button, FloatingLabel,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setMyChannelId } from '../../slices/uiStateSlice';
import socket from '../../socket';

const Add = ({ hideModal, channels }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Formik
      validateOnBlur={false}
      initialValues={{ name: '' }}
      validate={(values) => {
        const errors = {};
        if (!values.name) {
          errors.name = 'modals.add.validation.required';
        } else {
          const index = channels.findIndex((channel) => (channel.name === values.name));
          if (index >= 0) {
            errors.name = 'modals.add.validation.notUniqueName';
          }
        }
        return errors;
      }}
      onSubmit={({ name }, { setSubmitting }) => {
        const sendMessageTimeout = 5000;
        const channel = { name };
        socket.timeout(sendMessageTimeout).emit('newChannel', channel, (err, response) => {
          if (err) {
            toast.error(t('modals.add.addChannelError'));
            setSubmitting(false);
          } else {
            const { data } = response;
            toast.success(t('modals.add.addChannelSuccess'));
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
            <Modal.Title>{t('modals.add.title')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <FloatingLabel
                  label={t('modals.add.name')}
                >
                  <FormControl
                    ref={inputRef}
                    name="name"
                    id="name"
                    type="text"
                    placeholder={t('modals.add.name')}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    className="mb-2"
                    disabled={isSubmitting}
                    isInvalid={touched.name && errors.name}
                  />
                  {errors.name && touched.name
              && <FormControl.Feedback type="invalid">{t(errors.name)}</FormControl.Feedback>}
                </FloatingLabel>
                <div className="d-flex justify-content-end">
                  <Button variant="secondary" type="button" onClick={hideModal} className="me-2">
                    {t('modals.add.cancel')}
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting || (errors.name && touched.name)}
                  >
                    {t('modals.add.add')}
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
