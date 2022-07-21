import { ClientPersonal } from './UserPersonal/ClientPersonal';
import { User } from '../../types/User';
import React from 'react';
import { Pet } from '../../types/Pet';
import { createPet, getAllPets, getPetTypes } from '../../services/petsService';
import { PetCard } from './PetCard/PetCard';
import './UserProfile.scss';
import { AddPet } from './AddPet/AddPet';
import { PetType } from '../../types/PetType';
import { PetEditor } from '../PetEditor/PetEditor';
import { PetCreationData } from '../../types/PetCreationData';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface UserProfileProps {
  user: User;
}

export const UserProfile = ({ user }: UserProfileProps) => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [pets, setPets] = React.useState<Pet[]>([]);
  const [petTypes, setPetTypes] = React.useState<PetType[]>([]);
  const [addMode, setAddMode] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchPets = async () => {
      const petsResponse = await getAllPets();
      if (petsResponse.ok) {
        setPets(petsResponse.data);
      }

      const petTypesResponse = await getPetTypes();
      if (petTypesResponse.ok) {
        setPetTypes(petTypesResponse.data);
      }
    };
    fetchPets();
  }, []);

  const onAdd = React.useCallback(() => {
    setAddMode(true);
  }, []);

  const onSave = React.useCallback((pet: PetCreationData) => {
    createPet(pet).then((res) => {
      if (res.ok) {
        setPets((prev) => [...prev, res.data]);
        setAddMode(false);
      }
    });
  }, []);

  const onCancel = React.useCallback(() => {
    setAddMode(false);
  }, []);

  const onLogout = React.useCallback(() => {
    const logout = async () => {
      if (auth) {
        await auth.logout();
        navigate('/');
      }
    };
    logout();
  }, [auth]);

  return (
    <div className="profile-container">
      <button onClick={onLogout}>Выйти</button>
      <ClientPersonal user={user} />
      <h3>Ваши питомцы: </h3>
      <div className="pets-container">
        {pets.map((pet) => (
          <PetCard pet={pet} key={pet.id} />
        ))}
        {addMode ? (
          <PetEditor petTypes={petTypes} onSave={onSave} onCancel={onCancel} />
        ) : (
          <AddPet onAdd={onAdd} />
        )}
      </div>
    </div>
  );
};
