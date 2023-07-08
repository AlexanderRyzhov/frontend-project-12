// import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";


import "./App.css";
import Layout from "./components/Layout";
import LoginPage from "./components/LoginPage";
import MainPage from "./components/MainPage";
import NotFoundPage from "./components/NotFoundPage";
import RequireAuth from './components/RequireAuth';
import { AuthProvider } from './contexts/AuthContext';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout></Layout>}>
            <Route path="/" element={<RequireAuth><MainPage/></RequireAuth>} />
            <Route path="login" element={<LoginPage></LoginPage>} />
            <Route path="*" element={<NotFoundPage></NotFoundPage>} />
          </Route>        
        </Routes>
      </BrowserRouter>  
    </AuthProvider>
  );
}

export default App;
