import { Pet } from '../../../types/Pet';
import './PetItem.scss';
import React from 'react';
import { Link } from 'react-router-dom';

interface PetItemProps {
  pet: Pet;
  onOpen: (pet: Pet) => void;
  opened: boolean;
}

export const PetItem = ({ pet, onOpen, opened }: PetItemProps) => {
  const onPetOpen = React.useCallback(() => {
    onOpen(pet);
  }, [onOpen, pet]);

  return (
    <div className="pet-item" onClick={onPetOpen}>
      {pet.petType.name} {pet.name}
      {opened ? (
        <div className="full-info">
          <div>Порода: {pet.breed}</div>
          <div>Доп. инфо: {pet.info}</div>
          <div>Фото: {pet.photo}</div>
          <Link to={`/pets/${pet.id}`}>Редактировать</Link>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
