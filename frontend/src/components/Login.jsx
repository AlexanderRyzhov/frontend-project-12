import React from 'react';
import { Formik } from 'formik';
import { Button, Card, Col, FloatingLabel, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';

import loginImage from '../assets/login.png'

const LoginSchema = Yup.object().shape({
  username: Yup.string().min(3, 'не меньше 3-х символов').required('обязательное поле'),
  password: Yup.string().min(6, 'не меньше 6-и символов').required('обязательное поле'),  
});

function Login() {  
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
            onSubmit={values => {
              console.log(values);
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
                className={`${errors.username && touched.username ? 'is-invalid' : ''}`}
              />
              {errors.username && touched.username ? <div>{errors.username}</div> : null}
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
                className={`${errors.password && touched.password ? 'is-invalid' : ''}`}
              />
              {errors.password && touched.password ? <div>{errors.password}</div> : null}
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
      {/* </Row> */}
    </Card.Body>
    <Card.Footer className="text-muted p-4">
      {'Нет аккаунта? '}
      <NavLink to="/signup"> Регистрация</NavLink>
    </Card.Footer>
  </Card>
  );
}

export default Login;