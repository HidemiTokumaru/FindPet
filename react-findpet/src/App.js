import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import { Login } from "./Login";
import { SignUp } from "./SignUp";
import PrincipalPage from "./Principalpage";

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login onFormSwitch={toggleForm} />} />
          <Route path="/signup" element={<SignUp onFormSwitch={toggleForm} />} />
          <Route path="/principal" element={<PrincipalPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
