import React from 'react';
import { DoctorCreationData } from '../../types/DoctorCreationData';
import { Doctor } from '../../types/Doctor';
import './DoctorEditor.scss';

interface DoctorEditorProps {
  goBack: () => any;
  doctor: Doctor | DoctorCreationData;
  onSubmit: (doctor: Doctor | DoctorCreationData) => any;
  onFormChange: (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => any;
  err: string;
  showSavedMsg: boolean;
}

export const DoctorEditor = ({
  goBack,
  doctor,
  onSubmit,
  onFormChange,
  showSavedMsg,
  err,
}: DoctorEditorProps) => {
  const onDoctorSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onSubmit(doctor);
    },
    [onSubmit, doctor],
  );

  return (
    <div className="doctor-editor">
      <span onClick={goBack} className="go-back">
        Назад
      </span>
      <form onSubmit={onDoctorSubmit}>
        <label>
          <div>ФИО</div>
          <input
            placeholder="ФИО"
            value={doctor.name}
            onChange={onFormChange}
            name="name"
          />
        </label>
        <label>
          <div>Логин</div>
          <input
            placeholder="Логин"
            value={doctor.login}
            onChange={onFormChange}
            name="login"
          />
        </label>
        <label>
          <div>Номер телефона</div>
          <input
            placeholder="Номер телефона"
            value={doctor.phone}
            onChange={onFormChange}
            name="phone"
            className="phone"
          />
        </label>
        <label>
          <div>Образование</div>
          <input
            placeholder="Образование"
            value={doctor.education}
            onChange={onFormChange}
            name="education"
          />
        </label>
        <label>
          <div>Опыт</div>
          <input
            placeholder="Опыт"
            value={doctor.experience}
            onChange={onFormChange}
            name="experience"
          />
        </label>
        <label>
          <div>Достижения</div>
          <textarea
            placeholder="Достижения"
            value={doctor.achievements}
            onChange={onFormChange}
            name="achievements"
          />
        </label>
        <label>
          <div>Виды услуг</div>
          <textarea
            placeholder="Виды услуг"
            value={doctor.serviceTypes}
            onChange={onFormChange}
            name="serviceTypes"
          />
        </label>
        <label>
          <div>Пароль</div>
          <input
            placeholder="Пароль"
            value={doctor.password}
            onChange={onFormChange}
            name="password"
            type="password"
            className="password"
          />
        </label>
        <input type="submit" value="Сохранить" />
        {err ? <h4>{err}</h4> : ''}
        {showSavedMsg ? <div>Сохранено</div> : ''}
      </form>
    </div>
  );
};
