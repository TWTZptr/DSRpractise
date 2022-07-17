import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Homepage } from './pages/Homepage/Homepage';
import { Loginpage } from './pages/Loginpage/Loginpage';
import { AuthProvider } from './hoc/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Loginpage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
