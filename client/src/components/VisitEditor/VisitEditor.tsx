import React from 'react';
import { VisitCreationData } from '../../types/VisitCreationData';
import { Pet } from '../../types/Pet';
import './VisitEditor.scss';
import { INIT_VISIT } from './constants';
import { DoctorPublicData } from '../../types/DoctorPublicData';

interface VisitEditorProps {
  pets: Pet[];
  onSave: (visit: VisitCreationData) => any;
  onCancel: Function;
  doctors: DoctorPublicData[];
}

export const VisitEditor = React.memo(
  ({ pets, onSave, onCancel, doctors }: VisitEditorProps) => {
    const [visit, setVisit] = React.useState<VisitCreationData>(INIT_VISIT);
    const selectedDoctor =
      doctors.find((doctor) => doctor.id === visit.doctorId) || doctors[0];

    const onFormChange = React.useCallback(
      (event: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.currentTarget;
        setVisit((prev) => ({ ...prev, [name]: value }));
      },
      [],
    );

    const onAddCancel = React.useCallback(() => {
      onCancel();
    }, [onCancel]);

    const onSubmit = React.useCallback(
      (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSave(visit);
      },
      [visit, onSave],
    );

    React.useEffect(() => {
      setVisit((prev) => ({ ...prev, petId: pets[0].id }));
    }, [pets]);

    React.useEffect(() => {
      setVisit((prev) => ({ ...prev, doctorId: doctors[0].id }));
    }, [doctors]);

    return (
      <form className="visit-editor-form" onSubmit={onSubmit}>
        <h4>Питомец</h4>
        <select name="petId" defaultValue={pets[0].id} onChange={onFormChange}>
          {pets.map((pet) => (
            <option value={pet.id} key={pet.id}>
              {pet.name}
            </option>
          ))}
        </select>
        <h4>Доктор</h4>
        <select
          name="doctorId"
          defaultValue={doctors[0].id}
          onChange={onFormChange}
        >
          {doctors.map((doctor) => (
            <option value={doctor.id} key={doctor.id}>
              {doctor.name}
            </option>
          ))}
        </select>
        <div>
          Опыт:{' '}
          {selectedDoctor.experience ? selectedDoctor.experience : 'не указан'}
        </div>
        <div>
          Образование:{' '}
          {selectedDoctor.education ? selectedDoctor.education : 'не указано'}
        </div>
        <div>
          Предоставляемые услуги:{' '}
          {selectedDoctor.serviceTypes
            ? selectedDoctor.serviceTypes
            : 'не указаны'}
        </div>
        <h4>Дата и время визита</h4>
        <input
          type="datetime-local"
          value={visit.date}
          onChange={onFormChange}
          name="date"
          className="date-selector"
        />
        <div>
          <input type="submit" value="Сохранить" />
          <button onClick={onAddCancel}>Отменить</button>
        </div>
      </form>
    );
  },
);
