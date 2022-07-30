import { User } from '../../types/User';

export interface UserPersonalProps {
  user: User;
}

export const UserPersonal = ({ user }: UserPersonalProps) => {
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Личные данные</h3>
      <p>Логин: {user.login}</p>
      <p>Электронная почта: {user.email}</p>
      <p>Номер телефона: {user.phone}</p>
    </div>
  );
};
