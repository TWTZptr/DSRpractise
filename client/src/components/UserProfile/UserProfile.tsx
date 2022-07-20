import { ClientPersonal } from './UserPersonal/ClientPersonal';
import { User } from '../../types/User';
import React from 'react';
import { Pet } from '../../types/Pet';
import { getAllPets } from '../../services/petsService';
import { PetCard } from './PetCard/PetCard';
import './UserProfile.scss';

interface UserProfileProps {
  user: User;
}

export const UserProfile = ({ user }: UserProfileProps) => {
  const [pets, setPets] = React.useState<Pet[]>([]);

  React.useEffect(() => {
    const fetchPets = async () => {
      const response = await getAllPets();
      if (response.ok) {
        setPets(response.data);
      }
    };
    fetchPets();
  }, []);

  return (
    <div className="profile-container">
      <ClientPersonal user={user} />
      <h3>Ваши питомцы: </h3>
      <div className="pets-container">
        {pets.map((pet) => (
          <PetCard pet={pet} key={pet.id} />
        ))}
      </div>
    </div>
  );
};
