import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Homepage } from './pages/Homepage/Homepage';
import { Loginpage } from './pages/Loginpage/Loginpage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Loginpage />} />
    </Routes>
  );
}

export default App;
