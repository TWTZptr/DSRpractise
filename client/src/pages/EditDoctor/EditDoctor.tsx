import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SHOW_SAVED_MSG_TIME } from './constants';
import { Doctor } from '../../types/Doctor';
import { getDoctorById, updateDoctor } from '../../services/doctorsService';
import { validateDoctor } from './validators';
import { DoctorEditor } from '../../components/DoctorEditor/DoctorEditor';

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

  const onSubmit = React.useCallback((doctor: Doctor) => {
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
  }, []);

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
    <DoctorEditor
      goBack={goBack}
      doctor={doctor}
      onSubmit={onSubmit}
      onFormChange={onFormChange}
      err={err}
      showSavedMsg={showSavedMsg}
    />
  );
};
