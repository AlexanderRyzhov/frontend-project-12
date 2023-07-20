import React, { useState } from 'react';
import { Formik } from 'formik';
import {
  Button, Card, Col, Container, FloatingLabel, Form, Row,
} from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { useAuthContext } from '../contexts/AuthContext';

import loginImage from '../assets/login.png';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('loginPage.validation.required'),
  password: Yup.string().required('loginPage.validation.required'),
});

const LoginPage = () => {
  const { t } = useTranslation();
  const auth = useAuthContext();
  const navigate = useNavigate();
  const [authFailed, setAuthFailed] = useState(false);

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="text-center">
            <Card.Body className="row">
              <Col className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={loginImage} alt="Login icon" />
              </Col>
              <Col className="col-12 col-md-6">
                <Formik
                  initialValues={{ username: '', password: '' }}
                  validationSchema={LoginSchema}
                  onSubmit={async (values) => {
                    const signInResult = await auth.signIn(values);
                    if (signInResult) {
                      return navigate('/');
                    }
                    return setAuthFailed(true);
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
                    <Form onSubmit={handleSubmit}>
                      <h1 className="text-center mb-4">{t('loginPage.login')}</h1>
                      <FloatingLabel
                        controlId="username"
                        label={t('loginPage.username')}
                        className="mb-3 mt-3"
                      >
                        <Form.Control
                          type="text"
                          placeholder={t('loginPage.username')}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.username}
                          isInvalid={(touched.username && errors.username) || authFailed}
                          disabled={isSubmitting}
                        />
                        {((errors.username && touched.username))
                          && <Form.Control.Feedback type="invalid">{t(errors.username)}</Form.Control.Feedback>}
                      </FloatingLabel>
                      <FloatingLabel
                        controlId="password"
                        label={t('loginPage.password')}
                        className="mb-3 mt-3"
                      >
                        <Form.Control
                          type="password"
                          placeholder={t('loginPage.password')}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          isInvalid={(touched.password && errors.password) || authFailed}
                          disabled={isSubmitting}
                        />
                        {((errors.password && touched.password))
                          && <Form.Control.Feedback type="invalid">{t(errors.password)}</Form.Control.Feedback>}
                        <Form.Control.Feedback type="invalid">{authFailed ? t('loginPage.wrongCredentials') : ''}</Form.Control.Feedback>
                      </FloatingLabel>
                      <Button
                        variant="success"
                        as="input"
                        type="submit"
                        className="w-100 mb-3"
                        value={t('loginPage.login')}
                        disabled={isSubmitting}
                      />
                    </Form>
                  )}
                </Formik>
              </Col>
            </Card.Body>
            <Card.Footer className="text-muted p-4">
              {t('loginPage.noAccountQuestion')}
              <NavLink to="/signup">{t('loginPage.signup')}</NavLink>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
