import React from 'react';
import { User } from '../../types/User';
import { getAllUsers, setBanUser } from '../../services/usersService';
import './AdminPanel.scss';
import { UserItem } from './UserItem/UserItem';
import { useNavigate } from 'react-router-dom';
import { Doctor } from '../../types/Doctor';
import { getAllDoctors } from '../../services/doctorsService';
import { DoctorItem } from './DoctorItem/DoctorItem';

interface AdminPanelProps {
  admin: User;
}

export const AdminPanel = React.memo(({ admin }: AdminPanelProps) => {
  const navigate = useNavigate();
  const [users, setUsers] = React.useState<User[]>([]);
  const [doctors, setDoctors] = React.useState<Doctor[]>([]);

  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [selectedDoctor, setSelectedDoctor] = React.useState<Doctor | null>(
    null,
  );

  React.useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUsers();
      if (response.ok) {
        setUsers(response.data);
      }
    };

    const fetchDoctors = async () => {
      const response = await getAllDoctors();
      if (response.ok) {
        setDoctors(response.data);
      }
    };

    fetchDoctors();
    fetchUsers();
  }, []);

  const onUserSelect = React.useCallback((user: User) => {
    setSelectedUser(user);
  }, []);

  const onDoctorSelect = React.useCallback((doctor: Doctor) => {
    setSelectedDoctor(doctor);
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

  const onDoctorAdd = React.useCallback(() => {
    navigate('/doctors');
  }, [navigate]);

  return (
    <div className="panel-container">
      <h3>Администратор {admin.name}</h3>
      <h4>Врачи: </h4>
      <div className="users-container">
        {doctors.map((doctor) => (
          <DoctorItem
            doctor={doctor}
            opened={selectedDoctor?.id === doctor.id}
            onOpen={onDoctorSelect}
          />
        ))}
      </div>
      <button onClick={onDoctorAdd} className="add-doctor">
        Добавить врача
      </button>
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
