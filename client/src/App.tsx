import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Homepage } from './pages/Homepage/Homepage';
import { Loginpage } from './pages/Loginpage/Loginpage';
import { AuthProvider } from './hoc/AuthProvider';
import { Registrationpage } from './pages/Registrationpage/Registrationpage';
import { Profile } from './pages/Profile/Profile';
import { RequireAuth } from './hoc/RequireAuth';
import { RequireUnauth } from './hoc/RequireUnauth';
import { EditUser } from './pages/EditUser/EditUser';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/login"
          element={
            <RequireUnauth>
              <Loginpage />
            </RequireUnauth>
          }
        />
        <Route
          path="/registration"
          element={
            <RequireUnauth>
              <Registrationpage />
            </RequireUnauth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="/users/:id"
          element={
            <RequireAuth>
              <EditUser />
            </RequireAuth>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
