import React from 'react';
import { useState } from 'react';
import { Formik } from 'formik';
import { Button, Card, Col, FloatingLabel, Form } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { useAuthContext } from '../contexts/AuthContext';

import loginImage from '../assets/login.png';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('обязательное поле'),
  password: Yup.string().required('обязательное поле'),
  // username: Yup.string().min(2, 'не меньше 2-х символов').required('обязательное поле'),
  // password: Yup.string().min(2, 'не меньше 2-х символов').required('обязательное поле'),    
});

function LoginPage() {
  const auth = useAuthContext();
  const navigate = useNavigate();
  const [authFailed, setAuthFailed] = useState(false);

  return (
    <Card className="text-center">
    <Card.Body className="row">
        <Col className="col-12 col-md-6 d-flex align-items-center justify-content-center">
            <img src={loginImage} alt="Login icon"></img>
        </Col>
        <Col className="col-12 col-md-6">
          <Formik 
            initialValues={{ username:"", password:"" }}
            validationSchema={LoginSchema}
            onSubmit={async (values) => {
              const signInResult = await auth.signIn(values);
              if (signInResult) {
                navigate('/');
              }
              setAuthFailed(true);
            }}
          >
          {( {values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
            <h1 className="text-center mb-4">Войти</h1>        
            <FloatingLabel
              controlId="username"
              label="Логин"
              className="mb-3 mt-3"
            >
              <Form.Control 
                type="text" 
                placeholder="Логин" 
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                isInvalid={authFailed}
              />
              {/* {errors.username && touched.username ? <div>{errors.username}</div> : null} */}
            </FloatingLabel>
            <FloatingLabel
              controlId="password"
              label="Пароль"
              className="mb-3 mt-3"
            >
              <Form.Control 
                type="password" 
                placeholder="Пароль" 
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                // className={`${errors.password && touched.password ? 'is-invalid' : ''}`}
                isInvalid={authFailed}
              />
              <Form.Control.Feedback type="invalid">Неверные имя пользователя или пароль</Form.Control.Feedback>
            </FloatingLabel>
            <Button
              variant="success"
              as="input"
              type="submit"
              className="w-100 mb-3"
              value="Войти"
            />
            </Form>
          )} 
          </Formik>
        </Col>
    </Card.Body>
    <Card.Footer className="text-muted p-4">
      {'Нет аккаунта? '}
      <NavLink to="/signup"> Регистрация</NavLink>
    </Card.Footer>
  </Card>
  );
}

export default LoginPage;