import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ChatBot from './pages/ChatBot';
import Register from './pages/Register';
import Reports from './pages/Reports';
import Form from "./pages/Form";
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";


function App() {
  return (
    <div>
      <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="pages/ChatBot" element={<ChatBot />} />
            <Route path="pages/Register" element={<Register />} />
            <Route path="pages/Reports" element={<Reports />} />
            <Route path="pages/Form" element={<Form/>} />

          </Routes>
      </Router>
    </div>
  );
}

export default App;