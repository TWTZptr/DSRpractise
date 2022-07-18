import { useAuth } from '../../hooks/useAuth';

export const Profile = () => {
  const auth = useAuth();
  console.log(auth);
  return <div>{JSON.stringify(auth?.user)}</div>;
};
