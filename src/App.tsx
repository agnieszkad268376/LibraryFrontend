import React from "react";
import "./App.css";
import LoginForm from "./login-form/Login-form";
import HomePage from "./Home-page/Home-page";
import FeatureUser from "./featureUser/featureUser";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import ApiProvider from "./api/ApiProvider";
import FeatureBook from "./featureBook/featureBook";
import FeatureLoan from "./featureLoan/featureLoan";

function App() {
  return (
    <ApiProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/HomePage/featureUser" element={<FeatureUser />} />
          <Route path="/HomePage/featureBook" element={<FeatureBook />} />
          <Route path="/HomePage/featureLoan" element={<FeatureLoan />} />
        </Routes>
      </Router>
    </ApiProvider>
  );
}

export default App;
