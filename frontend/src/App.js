import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';  // Import AuthProvider
import LoginPage from './pages/LoginPage';
import CreateAccountPage from './pages/CreateAccountPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-account" element={<CreateAccountPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
