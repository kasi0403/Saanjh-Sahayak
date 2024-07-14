import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Register from './components/Sign';
import Login from "./components/Login";
import Home from "./pages/Home";
import ChatBot from './pages/ChatBot';
import Reports from './pages/Reports';
import Form from "./pages/Form";
import Admin from './pages/Admin';
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";


function App() {
  return (
    <div>
      <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ChatBot" element={<ChatBot />} />
            <Route path="/Register" element={<Register/>} />
            <Route path="/Login" element={<Login/>} />
            <Route path="/Reports" element={<Reports />} />
            <Route path="/Form" element={<Form/>} />
            <Route path="/Admin" element={<Admin/>}/>
          </Routes>

      </Router>
    </div>
  );
}

export default App;