import { useAuth } from '../../hooks/useAuth';
import './Profile.scss';
import { UserProfile } from '../../components/UserProfile/UserProfile';
import { AdminPanel } from '../../components/AdminPanel/AdminPanel';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DoctorProfile } from '../../components/DoctorProfile/DoctorProfile';

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
    case 'Doctor':
      profileContent = <DoctorProfile user={auth.user} />;
      break;
  }

  if (auth.user.banned) {
    profileContent = <div> Вам запрещен доступ к личному кабинету</div>;
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
