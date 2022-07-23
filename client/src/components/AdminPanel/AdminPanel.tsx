import React from 'react';
import { User } from '../../types/User';
import { getAllUsers, setBanUser } from '../../services/usersService';
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

  const onBanSet = React.useCallback(
    (userId: number, ban: boolean) => {
      setBanUser(userId, ban).then((res) => {
        setUsers((prev) => {
          const indexOfChangedUser = users.findIndex(
            (user) => user.id === userId,
          );
          prev[indexOfChangedUser] = res.data;
          return [...prev];
        });
      });
    },
    [users],
  );

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
            onBanSet={onBanSet}
          />
        ))}
      </div>
    </div>
  );
});
