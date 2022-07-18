import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Homepage } from './pages/Homepage/Homepage';
import { Loginpage } from './pages/Loginpage/Loginpage';
import { AuthProvider } from './hoc/AuthProvider';
import { Registrationpage } from './pages/Registrationpage/Registrationpage';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/registration" element={<Registrationpage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
