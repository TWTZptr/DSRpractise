import React from 'react';
import { Pet } from '../../../types/Pet';
import './PetCard.scss';
import { DEFAULT_PHOTO } from './constants';

interface PetCardProps {
  pet: Pet;
}

export const PetCard = ({ pet }: PetCardProps) => {
  const photoLink = pet.photo || DEFAULT_PHOTO;

  return (
    <div className="pet-card">
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
};
