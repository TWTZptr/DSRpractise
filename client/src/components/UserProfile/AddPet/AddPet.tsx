import './AddPet.scss';
import React from 'react';

interface AddPetProps {
  onAdd: () => void;
}

export const AddPet = ({ onAdd }: AddPetProps) => {
  return (
    <div className="pet-card-add" onClick={onAdd}>
      <div className="add-icon" />
    </div>
  );
};
