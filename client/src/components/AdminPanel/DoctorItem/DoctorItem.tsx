import { Doctor } from '../../../types/Doctor';
import React from 'react';
import { Link } from 'react-router-dom';

interface DoctorItemProps {
  doctor: Doctor;
  opened: boolean;
  onOpen: (doctor: Doctor) => void;
}

export const DoctorItem = React.memo(
  ({ doctor, opened, onOpen }: DoctorItemProps) => {
    const onDoctorClick = React.useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        onOpen(doctor);
      },
      [onOpen, doctor],
    );

    return (
      <div className="user-item" onClick={onDoctorClick}>
        {doctor.name}, логин: {doctor.login}
        {opened ? (
          <div className="full-info">
            <div>Номер телефона: {doctor.phone}</div>
            <div>Образование: {doctor.education}</div>
            <div>Опыт: {doctor.experience}</div>
            <div>Достижения: {doctor.achievements}</div>
            <div>Виды услуг: {doctor.serviceTypes}</div>
            <Link to={`/doctors/${doctor.id}`}>Редактировать</Link>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  },
);
