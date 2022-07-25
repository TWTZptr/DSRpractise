import React from 'react';
import { Visit } from '../../../types/Visit';
import './VisitCard.scss';
import { Pet } from '../../../types/Pet';

interface VisitCardProps {
  visit: Visit;
  pet: Pet;
  onDelete: (id: number) => any;
}

export const VisitCard = React.memo(
  ({ visit, pet, onDelete }: VisitCardProps) => {
    const date = new Date(visit.date);

    const onVisitDelete = React.useCallback(() => {
      onDelete(pet.id);
    }, [pet.id, onDelete]);

    return (
      <div className="visit-card">
        <p>
          {date.toLocaleDateString()} {date.toLocaleTimeString()}
        </p>
        <p>Питомец: {pet.name}</p>
        <button onClick={onVisitDelete}>Удалить</button>
      </div>
    );
  },
);
