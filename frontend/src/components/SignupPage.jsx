import axios from 'axios';
import { Formik } from 'formik';
import {
  Button, Card, Col, Container, FloatingLabel, Form, Row,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { useAuthContext } from '../contexts/AuthContext';
import signupImage from '../assets/signup.png';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .notOneOf([Yup.ref('busyName')], 'signupPage.validation.notUniqueUser')
    .min(3, 'signupPage.validation.min3')
    .max(20, 'signupPage.validation.max20')
    .required('signupPage.validation.required'),
  password: Yup.string()
    .min(6, 'signupPage.validation.min6')
    .required('signupPage.validation.required'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'signupPage.validation.mustMatch')
    .required('signupPage.validation.required'),
});

const SignupPage = () => {
  const { t } = useTranslation();
  const auth = useAuthContext();
  const navigate = useNavigate();

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="text-center">
            <Card.Body className="row">
              <Col className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={signupImage} alt="Login icon" />
              </Col>
              <Col className="col-12 col-md-6">
                <Formik
                  initialValues={{
                    username: '',
                    password: '',
                    passwordConfirmation: '',
                    busyName: '',
                  }}
                  validationSchema={SignupSchema}
                  onSubmit={async (values, { setFieldValue }) => {
                    try {
                      await auth.signUp(values);
                      return navigate('/');
                    } catch (error) {
                      if (axios.isAxiosError(error)) {
                        const { code, response } = error;
                        if (response?.status === 409) {
                          return setFieldValue('busyName', values.username);
                        }
                        return toast.error(t('signupPage.networkError', { code }));
                      }
                      throw error;
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
                    <Form onSubmit={handleSubmit}>
                      <h1 className="text-center mb-4">{t('signupPage.signupCaption')}</h1>
                      <FloatingLabel
                        controlId="username"
                        label={t('signupPage.username')}
                        className="mb-3 mt-3"
                      >
                        <Form.Control
                          type="text"
                          placeholder={t('signupPage.username')}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.username}
                          isInvalid={(touched.username && errors.username)}
                          disabled={isSubmitting}
                        />
                        {((errors.username && touched.username))
                          && <Form.Control.Feedback type="invalid">{t(errors.username)}</Form.Control.Feedback>}
                      </FloatingLabel>
                      <FloatingLabel
                        controlId="password"
                        label={t('signupPage.password')}
                        className="mb-3 mt-3"
                      >
                        <Form.Control
                          type="password"
                          placeholder={t('signupPage.password')}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          isInvalid={touched.password && errors.password}
                          disabled={isSubmitting}
                        />
                        {errors.password && touched.password
                          && <Form.Control.Feedback type="invalid">{t(errors.password)}</Form.Control.Feedback>}
                      </FloatingLabel>
                      <FloatingLabel
                        controlId="passwordConfirmation"
                        label={t('signupPage.passwordConfirmation')}
                        className="mb-3 mt-3"
                      >
                        <Form.Control
                          type="password"
                          placeholder={t('signupPage.passwordConfirmation')}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.passwordConfirmation}
                          isInvalid={touched.passwordConfirmation && errors.passwordConfirmation}
                          disabled={isSubmitting}
                        />
                        {errors.passwordConfirmation && touched.passwordConfirmation
                          && <Form.Control.Feedback type="invalid">{t(errors.passwordConfirmation)}</Form.Control.Feedback>}
                      </FloatingLabel>
                      <Button
                        variant="success"
                        as="input"
                        type="submit"
                        className="w-100 mb-3"
                        value={t('signupPage.signupButton')}
                      />
                    </Form>
                  )}
                </Formik>
              </Col>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
