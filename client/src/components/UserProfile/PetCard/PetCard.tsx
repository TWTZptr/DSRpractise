import React from 'react';
import { Pet } from '../../../types/Pet';
import './PetCard.scss';
import { DEFAULT_PHOTO } from './constants';
import { useNavigate } from 'react-router-dom';

interface PetCardProps {
  pet: Pet;
}

export const PetCard = React.memo(({ pet }: PetCardProps) => {
  const photoLink = pet.photo || DEFAULT_PHOTO;

  const navigate = useNavigate();

  const onClick = React.useCallback(() => {
    navigate(`/pets/${pet.id}`);
  }, [navigate, pet.id]);

  return (
    <div className="pet-card" onClick={onClick}>
      <img src={photoLink} alt="Питомец" className="pet-card-photo" />{' '}
      <div className="pet-card-info">
        <h4>{pet.name}</h4>
        <span>
          {pet.petType.name}, {pet.breed}
        </span>
        <span>{pet.info}</span>
      </div>
    </div>
  );
});
