import React, { useEffect, useRef } from 'react';
import { Formik } from 'formik';
import {
  Modal, FormGroup, FormControl, Button, FloatingLabel,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import socket from '../../socket';

const Rename = ({ hideModal, channels, modalInfo }) => {
  const { t } = useTranslation();
  const { channel } = modalInfo;
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Formik
      initialValues={{ name: channel.name }}
      validateOnBlur={false}
      validate={(values) => {
        const errors = {};
        if (!values.name) {
          errors.name = 'modals.rename.validation.required';
        } else {
          const index = channels.findIndex((item) => (item.name === values.name));
          if (index >= 0) {
            errors.name = 'modals.rename.validation.notUniqueName';
          }
        }
        return errors;
      }}
      onSubmit={({ name }, { setSubmitting }) => {
        const sendMessageTimeout = 5000;
        const modifiedChannel = { id: channel.id, name };
        socket.timeout(sendMessageTimeout).emit('renameChannel', modifiedChannel, (err) => {
          if (err) {
            toast.error(t('modals.rename.renameChannelError'));
            setSubmitting(false);
          } else {
            toast.success(t('modals.rename.renameChannelSuccess'));
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
            <Modal.Title>{t('modals.rename.title')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <FloatingLabel
                  controlId="name"
                  label={t('modals.rename.name')}
                >
                  <FormControl
                    ref={inputRef}
                    name="name"
                    id="name"
                    type="text"
                    placeholder={t('modals.rename.name')}
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
                    {t('modals.rename.cancel')}
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting || (errors.name && touched.name)}
                  >
                    {t('modals.rename.rename')}
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

export default Rename;
