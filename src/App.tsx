import React from "react";
import "./App.css";
import LoginForm from "./login-form/Login-form";
import HomePage from "./Home-page/Home-page";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/HomePage" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
