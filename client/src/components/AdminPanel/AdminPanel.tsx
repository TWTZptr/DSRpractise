import React from 'react';
import { User } from '../../types/User';
import { getAllUsers } from '../../services/usersService';
import './AdminPanel.scss';
import { UserItem } from './UserItem/UserItem';

interface AdminPanelProps {
  admin: User;
}

export const AdminPanel = React.memo(({ admin }: AdminPanelProps) => {
  const [users, setUsers] = React.useState<User[]>([]);

  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUsers();
      if (response.ok) {
        setUsers(response.data);
      }
    };

    fetchUsers();
  }, []);

  const onUserSelect = React.useCallback((user: User) => {
    setSelectedUser(user);
  }, []);

  return (
    <div className="panel-container">
      <h3>Администратор {admin.name}</h3>
      <h4>Пользователи: </h4>
      <div className="users-container">
        {users.map((user) => (
          <UserItem
            user={user}
            opened={selectedUser?.id === user.id}
            onOpen={onUserSelect}
            key={user.id}
          />
        ))}
      </div>
    </div>
  );
});
