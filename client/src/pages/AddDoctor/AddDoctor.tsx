import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Doctor } from '../../types/Doctor';
import { createDoctor } from '../../services/doctorsService';
import { DoctorCreationData } from '../../types/DoctorCreationData';
import { INIT_DOCTOR, SHOW_SAVED_MSG_TIME } from './constants';
import { validateDoctor } from '../EditDoctor/validators';
import { DoctorEditor } from '../../components/DoctorEditor/DoctorEditor';

export const AddDoctor = () => {
  const navigate = useNavigate();
  const [doctor, setDoctor] = React.useState<Doctor | DoctorCreationData>(
    INIT_DOCTOR,
  );
  const [showSavedMsg, setShowSavedMsg] = React.useState<boolean>(false);
  const [err, setErr] = React.useState<string>('');

  const goBack = React.useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onSubmit = React.useCallback((doctor: DoctorCreationData) => {
    const validationError = validateDoctor(doctor);
    if (validationError) {
      setErr(validationError);
      return;
    }

    createDoctor(doctor).then((res) => {
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

      setDoctor((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

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
