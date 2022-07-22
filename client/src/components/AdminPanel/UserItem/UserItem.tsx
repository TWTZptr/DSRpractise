import React from 'react';
import { User } from '../../../types/User';
import './UserItem.scss';
import { Link } from 'react-router-dom';

interface UserItemProps {
  user: User;
  opened: boolean;
  onOpen: (user: User) => void;
}

export const UserItem = React.memo(
  ({ user, opened, onOpen }: UserItemProps) => {
    const onUserClick = React.useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        onOpen(user);
      },
      [onOpen, user],
    );

    return (
      <div key={user.id} className="user-item" onClick={onUserClick}>
        {user.name}, логин: {user.login}
        {opened ? (
          <div className="full-info">
            <div>Email: {user.email}</div>
            <div>Номер телефона: {user.phone}</div>
            <div>Роль: {user.role.name}</div>
            <div>Забанен: {user.banned ? 'Да' : 'Нет'}</div>
            <Link to={`/users/${user.id}`}>Редактировать</Link>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  },
);
