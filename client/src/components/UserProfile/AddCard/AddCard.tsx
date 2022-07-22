import './AddCard.scss';
import React from 'react';

interface AddPetProps {
  onAdd: () => void;
}

export const AddCard = ({ onAdd }: AddPetProps) => {
  return (
    <div className="pet-card-add" onClick={onAdd}>
      <div className="add-icon" />
    </div>
  );
};
