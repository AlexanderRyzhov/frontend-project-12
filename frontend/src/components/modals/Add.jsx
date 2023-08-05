import React, { useEffect, useRef } from 'react';
import { Formik } from 'formik';
import {
  Modal, FormGroup, FormControl, Button, FloatingLabel,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { setMyChannelId } from '../../slices/uiStateSlice';
import { useSocketApi } from '../../contexts/SocketContext';

const Add = ({ hideModal, channels }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const api = useSocketApi();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const channelNames = channels.map(({ name }) => name);
  const ChannelNameSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required('modals.add.validation.required')
      .min(3, 'modals.add.validation.min3')
      .max(20, 'modals.add.validation.max20')
      .notOneOf(channelNames, 'modals.add.validation.notUniqueName'),
  });

  return (
    <Formik
      validateOnBlur={false}
      initialValues={{ name: '' }}
      validationSchema={ChannelNameSchema}
      onSubmit={async ({ name }, { setSubmitting }) => {
        try {
          const channel = { name: name.trim() };
          const { data } = await api.newChannel(channel);
          dispatch(setMyChannelId(data.id));
          toast.success(t('modals.add.addChannelSuccess'));
          hideModal();
        } catch (err) {
          toast.error(t('modals.add.addChannelError'));
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
            <Modal.Title>{t('modals.add.title')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <FloatingLabel
                  label={t('modals.add.name')}
                  controlId="name"
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
