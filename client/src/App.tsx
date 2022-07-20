import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Homepage } from './pages/Homepage/Homepage';
import { Loginpage } from './pages/Loginpage/Loginpage';
import { AuthProvider } from './hoc/AuthProvider';
import { Registrationpage } from './pages/Registrationpage/Registrationpage';
import { Profile } from './pages/Profile/Profile';
import { RequireAuth } from './hoc/RequireAuth';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/registration" element={<Registrationpage />} />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
