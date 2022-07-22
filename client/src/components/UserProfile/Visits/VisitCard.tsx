import React from 'react';
import { Visit } from '../../../types/Visit';
import './VisitCard.scss';
import { Pet } from '../../../types/Pet';

interface VisitCardProps {
  visit: Visit;
  pet: Pet;
}

export const VisitCard = React.memo(({ visit, pet }: VisitCardProps) => {
  const date = new Date(visit.date);
  console.log(date);
  return (
    <div className="visit-card">
      <p>
        {date.toLocaleDateString()} {date.toLocaleTimeString()}
      </p>
      <p>Питомец: {pet.name}</p>
    </div>
  );
});
