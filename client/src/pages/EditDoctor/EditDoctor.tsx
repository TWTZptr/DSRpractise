import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SHOW_SAVED_MSG_TIME } from './constants';
import { Doctor } from '../../types/Doctor';
import { getDoctorById, updateDoctor } from '../../services/doctorsService';
import { validateDoctor } from './validators';
import './EditDoctor.scss';

export const EditDoctor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = React.useState<Doctor | null>(null);
  const [showSavedMsg, setShowSavedMsg] = React.useState<boolean>(false);
  const [err, setErr] = React.useState<string>('');

  React.useEffect(() => {
    const fetchDoctor = async () => {
      if (id) {
        getDoctorById(+id).then((res) => setDoctor(res.data));
      }
    };

    fetchDoctor();
  }, [id]);

  const goBack = React.useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!doctor) {
        return;
      }

      const validationError = validateDoctor(doctor);
      if (validationError) {
        setErr(validationError);
        return;
      }

      updateDoctor(doctor).then((res) => {
        if (res.ok) {
          setShowSavedMsg(true);
        }

        setTimeout(() => setShowSavedMsg(false), SHOW_SAVED_MSG_TIME);
      });
    },
    [doctor],
  );

  const onFormChange = React.useCallback(
    (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setErr('');
      const { name, value } = event.currentTarget;

      setDoctor((prev) => (prev ? { ...prev, [name]: value } : prev));
    },
    [],
  );

  if (!doctor) {
    return <div className="doctor-editor">Загрузка...</div>;
  }

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
        <input type="submit" value="Сохранить" />
        {err ? <h4>{err}</h4> : ''}
        {showSavedMsg ? <div>Сохранено</div> : ''}
      </form>
    </div>
  );
};
