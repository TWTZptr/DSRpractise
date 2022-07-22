import { useAuth } from '../../hooks/useAuth';
import './Profile.scss';
import { UserProfile } from '../../components/UserProfile/UserProfile';
import { AdminPanel } from '../../components/AdminPanel/AdminPanel';

export const Profile = () => {
  const auth = useAuth();

  if (!auth) {
    return <>Неизвестная ошибка</>;
  }

  switch (auth.user.role.name) {
    case 'Client':
      return <UserProfile user={auth.user} />;
    case 'Admin':
      return <AdminPanel admin={auth.user} />;
  }
  return <div>Неизвестная ошибка</div>;
};
