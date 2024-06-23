import React from "react";
import "./App.css";
import LoginForm from "./login-form/Login-form";
import HomePage from "./Home-page/Home-page";
import FeatureUser from "./featureUser/featureUser";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ApiProvider from "./api/ApiProvider";
import FeatureBook from "./featureBook/featureBook";
import FeatureLoan from "./featureLoan/featureLoan";
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import UserHome from "./UserHome/UserHome"; // Importuj komponent

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ApiProvider>
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<LoginForm />} />
              <Route path="/HomePage" element={<HomePage />} />
              <Route path="/HomePage/featureUser" element={<FeatureUser />} />
              <Route path="/HomePage/featureBook" element={<FeatureBook />} />
              <Route path="/HomePage/featureLoan" element={<FeatureLoan />} />
              <Route path="/UserHome" element={<UserHome />} />
            </Routes>
          </div>
        </Router>
      </ApiProvider>
    </I18nextProvider>
  );
}

export default App;
