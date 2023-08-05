import React, { useEffect, useRef } from 'react';
import { Formik } from 'formik';
import {
  Modal, FormGroup, FormControl, Button, FloatingLabel,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { useSocketApi } from '../../contexts/SocketContext';

const Rename = ({ hideModal, channels, modalInfo }) => {
  const { t } = useTranslation();
  const api = useSocketApi();
  const { channel } = modalInfo;
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const channelNames = channels.map(({ name }) => name);
  const ChannelNameSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required('modals.rename.validation.required')
      .min(3, 'modals.rename.validation.min3')
      .max(20, 'modals.rename.validation.max20')
      .notOneOf(channelNames, 'modals.rename.validation.notUniqueName'),
  });

  return (
    <Formik
      initialValues={{ name: channel.name }}
      validateOnBlur={false}
      validationSchema={ChannelNameSchema}
      onSubmit={({ name }, { setSubmitting }) => {
        try {
          const modifiedChannel = { id: channel.id, name: name.trim() };
          api.renameChannel(modifiedChannel);
          toast.success(t('modals.rename.renameChannelSuccess'));
          hideModal();
        } catch (err) {
          toast.error(t('modals.rename.renameChannelError'));
          setSubmitting(false);
        }
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
                  label={t('modals.rename.name')}
                  controlId="name"
                >
                  <FormControl
                    ref={inputRef}
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
