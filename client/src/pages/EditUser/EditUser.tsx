import { Link, useParams } from 'react-router-dom';
import './EditUser.scss';
import React from 'react';
import { getUserInfo, updateUser } from '../../services/usersService';
import { User } from '../../types/User';
import { SHOW_SAVED_MSG_TIME } from './constants';

export const EditUser = () => {
  const { id } = useParams();
  const [user, setUser] = React.useState<User | null>(null);
  const [showMsg, setShowMsg] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        const response = await getUserInfo(+id);
        setUser(response.data);
      }
    };

    fetchUser();
  }, [id]);

  const onFormChange = React.useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      const { name, value } = event.currentTarget;
      setUser((prev) => {
        if (!prev) {
          return prev;
        }

        return { ...prev, [name]: value };
      });
    },
    [],
  );

  const onSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (user) {
        updateUser(user).then(() => {
          setShowMsg(true);
          setTimeout(() => setShowMsg(false), SHOW_SAVED_MSG_TIME);
        });
      }
    },
    [user],
  );

  return (
    <div className="user-editor">
      <Link to={'/profile'}>Назад</Link>
      {user ? (
        <form onSubmit={onSubmit}>
          <label>
            <div>Логин</div>
            <input
              placeholder="Логин"
              value={user.login}
              onChange={onFormChange}
              name="login"
            />
          </label>
          <label>
            <div>Электронная почта</div>
            <input
              placeholder="Электронная почта"
              value={user.email}
              onChange={onFormChange}
              name="email"
            />
          </label>

          <label>
            <div>Имя</div>
            <input
              placeholder="Имя"
              value={user.name}
              onChange={onFormChange}
              name="name"
            />
          </label>
          <label>
            <div>Номер телефона</div>
            <input
              placeholder="Номер телефона"
              value={user.phone}
              onChange={onFormChange}
              name="phone"
            />
          </label>
          <button type="submit">Сохранить</button>
          {showMsg ? 'Сохранено' : ''}
        </form>
      ) : (
        'Загрузка...'
      )}
    </div>
  );
};
