// import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Provider } from 'react-redux';

import './App.css';
import Layout from './components/Layout.jsx';
import LoginPage from './components/LoginPage.jsx';
import MainPage from './components/MainPage.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';
import RequireAuth from './components/RequireAuth.jsx';
import SignupPage from './components/SignupPage';
import { AuthProvider } from './contexts/AuthContext.jsx';
import store from './slices/index.js';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
  environment: process.env.REACT_APP_ROLLBAR_ENVIROMENT,
};

const App = () => (
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <AuthProvider>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="/" element={<RequireAuth><MainPage /></RequireAuth>} />
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignupPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Provider>
      </AuthProvider>
    </ErrorBoundary>
  </RollbarProvider>
);

export default App;
