import React from 'react';
import { User } from '../../types/User';
import { getAllUsers, setBanUser } from '../../services/usersService';
import './AdminPanel.scss';
import { UserItem } from './UserItem/UserItem';
import { useNavigate } from 'react-router-dom';
import { Doctor } from '../../types/Doctor';
import { deleteDoctor, getAllDoctors } from '../../services/doctorsService';
import { DoctorItem } from './DoctorItem/DoctorItem';
import { debounce } from 'lodash';
import { FILTER_DELAY } from './constants';

interface AdminPanelProps {
  admin: User;
}

export const AdminPanel = React.memo(({ admin }: AdminPanelProps) => {
  const navigate = useNavigate();
  const [users, setUsers] = React.useState<User[]>([]);
  const [doctors, setDoctors] = React.useState<Doctor[]>([]);
  const [userFilter, setUserFilter] = React.useState<string>('');
  const [doctorFilter, setDoctorFilter] = React.useState<string>('');
  const [filteredDoctors, setFilteredDoctors] = React.useState<Doctor[]>([]);
  const [filteredUsers, setFilteredUsers] = React.useState<User[]>([]);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  const [selectedDoctor, setSelectedDoctor] = React.useState<Doctor | null>(
    null,
  );

  const setFilteredDoctorsDebounced = React.useRef(
    debounce((filter: string, doctors: Doctor[]) => {
      const loweredFilter = filter.toLowerCase();
      setFilteredDoctors(
        doctors.filter(
          (doctor) =>
            doctor.name.toLowerCase().includes(loweredFilter) ||
            doctor.login.toLowerCase().includes(loweredFilter),
        ),
      );
    }, FILTER_DELAY),
  );

  const setFilteredUsersDebounced = React.useRef(
    debounce((filter: string, users: User[]) => {
      const loweredFilter = filter.toLowerCase();
      setFilteredUsers(
        users.filter(
          (user) =>
            user.name.toLowerCase().includes(loweredFilter) ||
            user.login.toLowerCase().includes(loweredFilter),
        ),
      );
    }, FILTER_DELAY),
  );

  const onDoctorFilterChange = React.useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      setDoctorFilter(event.currentTarget.value);
    },
    [],
  );

  const onUserFilterChange = React.useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      setUserFilter(event.currentTarget.value);
    },
    [],
  );

  React.useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUsers();
      if (response.ok) {
        setUsers(response.data);
        setFilteredUsers(response.data);
      }
    };

    const fetchDoctors = async () => {
      const response = await getAllDoctors();
      if (response.ok) {
        setDoctors(response.data);
        setFilteredDoctors(response.data);
      }
    };

    fetchDoctors();
    fetchUsers();
  }, []);

  React.useEffect(() => {
    setFilteredDoctorsDebounced.current(doctorFilter, doctors);
  }, [doctorFilter, doctors]);

  React.useEffect(() => {
    setFilteredUsersDebounced.current(userFilter, users);
  }, [userFilter, users]);

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
    navigate('/doctors/create');
  }, [navigate]);

  const onDoctorDelete = React.useCallback((doctorToDelete: Doctor) => {
    deleteDoctor(doctorToDelete.id!).then((res) => {
      if (res.ok) {
        setDoctors((prev) =>
          prev.filter((doctor) => doctor.id !== doctorToDelete.id),
        );
      }
    });
  }, []);

  return (
    <div className="panel-container">
      <h3>Администратор {admin.name}</h3>
      <h4>Врачи: </h4>
      <input
        placeholder="Найти по имени, логину"
        value={doctorFilter}
        onChange={onDoctorFilterChange}
      />
      <div className="users-container">
        {filteredDoctors.map((doctor) => (
          <DoctorItem
            doctor={doctor}
            opened={selectedDoctor?.id === doctor.id}
            onOpen={onDoctorSelect}
            onDelete={onDoctorDelete}
            key={doctor.id}
          />
        ))}
      </div>
      <button onClick={onDoctorAdd} className="add-doctor">
        Добавить врача
      </button>
      <h4>Пользователи: </h4>
      <input
        placeholder="Найти по имени, логину"
        value={userFilter}
        onChange={onUserFilterChange}
      />
      <div className="users-container">
        {filteredUsers.map((user) => (
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
