import { useAuth } from '../../hooks/useAuth';
import './Profile.scss';
import { UserProfile } from '../../components/UserProfile/UserProfile';

export const Profile = () => {
  const auth = useAuth();

  if (!auth) {
    return <>Неизвестная ошибка</>;
  }

  switch (auth.user.role.name) {
    case 'Client':
      return <UserProfile user={auth.user} />;
  }
  return <div>{JSON.stringify(auth?.user)}</div>;
};
