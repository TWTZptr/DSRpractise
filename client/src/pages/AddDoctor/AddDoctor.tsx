import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createDoctor } from '../../services/doctorsService';
import { DoctorCreationData } from '../../types/DoctorCreationData';
import {
  INIT_DOCTOR,
  SHOW_SAVED_MSG_TIME,
  USER_WITH_THAT_LOGIN_ALREADY_EXISTS_MSG,
} from './constants';
import { validateDoctor } from '../EditDoctor/validators';
import './AddDoctor.scss';

export const AddDoctor = () => {
  const navigate = useNavigate();
  const [doctor, setDoctor] = React.useState<DoctorCreationData>(INIT_DOCTOR);
  const [showSavedMsg, setShowSavedMsg] = React.useState<boolean>(false);
  const [err, setErr] = React.useState<string>('');

  const goBack = React.useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const validationError = validateDoctor(doctor);
      if (validationError) {
        setErr(validationError);
        return;
      }

      createDoctor(doctor).then((res) => {
        if (res.ok) {
          setShowSavedMsg(true);
          navigate('/profile');
        }

        if (res.status === 409) {
          setErr(USER_WITH_THAT_LOGIN_ALREADY_EXISTS_MSG);
        }

        setTimeout(() => setShowSavedMsg(false), SHOW_SAVED_MSG_TIME);
      });
    },
    [navigate, doctor],
  );

  const onFormChange = React.useCallback(
    (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setErr('');
      const { name, value } = event.currentTarget;

      setDoctor((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  return (
    <div className="doctor-editor">
      <span onClick={goBack} className="go-back">
        Назад
      </span>
      <form onSubmit={onSubmit}>
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
