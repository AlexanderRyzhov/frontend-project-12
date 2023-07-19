import axios from 'axios';
import { Formik } from 'formik';
import {
  Button, Card, Col, Container, FloatingLabel, Form, Row,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { useAuthContext } from '../contexts/AuthContext';

import signupImage from '../assets/signup.png';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .notOneOf([Yup.ref('busyName')], 'Такой пользователь уже существует')
    .min(3, 'не меньше 3-х символов')
    .max(20, 'не более 20 символов')
    .required('обязательное поле'),
  password: Yup.string()
    // .matches(/(^admin$)|(^.{6,}$)/, 'не меньше 6 символов')
    .min(6, 'не меньше 6 символов')
    .required('обязательное поле'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('обязательное поле'),
});

const SignupPage = () => {
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
                      // const signUpResult = await auth.signUp(values);
                      // if (signUpResult) {
                      return navigate('/');
                      // }
                    } catch (error) {
                      if (axios.isAxiosError(error)) {
                        const { code, response } = error;
                        if (response?.status === 409) {
                          return setFieldValue('busyName', values.username);
                        }
                        return toast.error(`axios error, code = ${code}`);
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
                      <h1 className="text-center mb-4">Регистрация</h1>
                      <FloatingLabel
                        controlId="username"
                        label="Имя пользователя"
                        className="mb-3 mt-3"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Логин"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.username}
                          isInvalid={(touched.username && errors.username)}
                          disabled={isSubmitting}
                        />
                        {((errors.username && touched.username))
                          && <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>}
                      </FloatingLabel>
                      <FloatingLabel
                        controlId="password"
                        label="Пароль"
                        className="mb-3 mt-3"
                      >
                        <Form.Control
                          type="password"
                          placeholder="Пароль"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          isInvalid={touched.password && errors.password}
                          disabled={isSubmitting}
                        />
                        {errors.password && touched.password
                          && <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>}
                      </FloatingLabel>
                      <FloatingLabel
                        controlId="passwordConfirmation"
                        label="Повторите пароль"
                        className="mb-3 mt-3"
                      >
                        <Form.Control
                          type="password"
                          placeholder="Пароль"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.passwordConfirmation}
                          isInvalid={touched.passwordConfirmation && errors.passwordConfirmation}
                          disabled={isSubmitting}
                        />
                        {errors.passwordConfirmation && touched.passwordConfirmation
                          && <Form.Control.Feedback type="invalid">{errors.passwordConfirmation}</Form.Control.Feedback>}
                      </FloatingLabel>
                      <Button
                        variant="success"
                        as="input"
                        type="submit"
                        className="w-100 mb-3"
                        value="Войти"
                      />
                      <Form.Control.Feedback type="invalid">button error</Form.Control.Feedback>
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
