import { useAuth } from '../../hooks/useAuth';
import './Profile.scss';
import { UserProfile } from '../../components/UserProfile/UserProfile';
import { AdminPanel } from '../../components/AdminPanel/AdminPanel';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const onLogout = React.useCallback(() => {
    const logout = async () => {
      if (auth) {
        await auth.logout();
        navigate('/');
      }
    };
    logout();
  }, [auth, navigate]);

  if (!auth) {
    return <>Неизвестная ошибка</>;
  }

  let profileContent: React.ReactNode;

  switch (auth.user.role.name) {
    case 'Client':
      profileContent = <UserProfile user={auth.user} />;
      break;
    case 'Admin':
      profileContent = <AdminPanel admin={auth.user} />;
      break;
  }
  return (
    <div className="profile-container">
      <button onClick={onLogout} className="logout-button">
        Выйти
      </button>
      {profileContent}
    </div>
  );
};
