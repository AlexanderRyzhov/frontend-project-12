import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Main from "./components/Main";
import NotFound from "./components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout></Layout>}>
          <Route path="/" element={<Main></Main>} />
          <Route path="login" element={<Login></Login>} />
          <Route path="*" element={<NotFound></NotFound>} />
        </Route>        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
