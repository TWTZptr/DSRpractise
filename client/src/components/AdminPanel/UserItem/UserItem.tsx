import React from 'react';
import { User } from '../../../types/User';
import './UserItem.scss';
import { Link } from 'react-router-dom';

interface UserItemProps {
  user: User;
  opened: boolean;
  onOpen: (user: User) => void;
  onBanSet: (userId: number, ban: boolean) => void;
}

export const UserItem = React.memo(
  ({ user, opened, onOpen, onBanSet }: UserItemProps) => {
    const onUserClick = React.useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        onOpen(user);
      },
      [onOpen, user],
    );

    const onUserBan = React.useCallback(() => {
      onBanSet(user.id, !user.banned);
    }, [user.id, user.banned, onBanSet]);

    return (
      <div className="user-item" onClick={onUserClick}>
        {user.name}, логин: {user.login}
        {opened ? (
          <div className="full-info">
            <div>Email: {user.email}</div>
            <div>Номер телефона: {user.phone}</div>
            <div>Роль: {user.role.name}</div>
            <div>
              Заблокирован: {user.banned ? 'Да' : 'Нет'}
              <button onClick={onUserBan}>
                {user.banned ? 'Разблокировать' : 'Заблокировать'}
              </button>
            </div>
            <Link to={`/users/${user.id}`}>Редактировать</Link>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  },
);
