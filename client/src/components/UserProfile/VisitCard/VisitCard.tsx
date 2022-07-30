import React from 'react';
import { Visit } from '../../../types/Visit';
import './VisitCard.scss';
import { Pet } from '../../../types/Pet';
import { DoctorPublicData } from '../../../types/DoctorPublicData';

interface VisitCardProps {
  visit: Visit;
  pet: Pet;
  onDelete: (id: number) => any;
  doctor: DoctorPublicData;
}

export const VisitCard = React.memo(
  ({ visit, pet, onDelete, doctor }: VisitCardProps) => {
    const date = new Date(visit.date);

    const onVisitDelete = React.useCallback(() => {
      onDelete(visit.id);
    }, [visit.id, onDelete]);

    return (
      <div className="visit-card">
        <p>
          {date.toLocaleDateString()} {date.toLocaleTimeString()}
        </p>
        <p>Питомец: {pet.name}</p>
        <p>Доктор: {doctor?.name || 'Неизвестен'}</p>
        <button onClick={onVisitDelete}>Удалить</button>
      </div>
    );
  },
);
