import { ClientPersonal } from './UserPersonal/ClientPersonal';
import { User } from '../../types/User';
import React from 'react';
import { Pet } from '../../types/Pet';
import { createPet, getAllPets, getPetTypes } from '../../services/petsService';
import { PetCard } from './PetCard/PetCard';
import './UserProfile.scss';
import { AddCard } from './AddCard/AddCard';
import { PetType } from '../../types/PetType';
import { PetEditor } from '../PetEditor/PetEditor';
import { PetCreationData } from '../../types/PetCreationData';
import { Visit } from '../../types/Visit';
import { createVisit } from '../../services/visitsService';
import { VisitCard } from './Visits/VisitCard';
import { VisitCreationData } from '../../types/VisitCreationData';
import { VisitEditor } from '../VisitEditor/VisitEditor';

interface UserProfileProps {
  user: User;
}

export const UserProfile = ({ user }: UserProfileProps) => {
  const [pets, setPets] = React.useState<Pet[]>([]);
  const [visits, setVisits] = React.useState<Visit[]>([]);
  const [petTypes, setPetTypes] = React.useState<PetType[]>([]);
  const [petAddMode, setPetAddMode] = React.useState<boolean>(false);
  const [visitAddMode, setVisitAddMode] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchPets = async () => {
      const petsResponse = await getAllPets();
      if (petsResponse.ok) {
        setPets(petsResponse.data);
        const allVisits: Visit[] = [];
        petsResponse.data.forEach((pet: any) => allVisits.push(...pet.visits));
        setVisits(allVisits);
      }

      const petTypesResponse = await getPetTypes();
      if (petTypesResponse.ok) {
        setPetTypes(petTypesResponse.data);
      }
    };

    fetchPets().then((res) => {});
  }, []);

  const onPetAdd = React.useCallback(() => {
    setPetAddMode(true);
  }, []);

  const onVisitAdd = React.useCallback(() => {
    setVisitAddMode(true);
  }, []);

  const onPetSave = React.useCallback((pet: PetCreationData) => {
    createPet(pet).then((res) => {
      if (res.ok) {
        setPets((prev) => [...prev, res.data]);
        setPetAddMode(false);
      }
    });
  }, []);

  const onPetAddCancel = React.useCallback(() => {
    setPetAddMode(false);
  }, []);

  const onVisitAddCancel = React.useCallback(() => {
    setVisitAddMode(false);
  }, []);

  const onVisitSave = React.useCallback((visit: VisitCreationData) => {
    createVisit(visit).then((res) => {
      if (res.ok) {
        setVisits((prev) => [...prev, res.data]);
        setVisitAddMode(false);
      }
    });
  }, []);

  return (
    <div className="user-profile-container">
      <ClientPersonal user={user} />
      <h3>Ваши питомцы: </h3>
      <div className="pets-container">
        {pets.map((pet) => (
          <PetCard pet={pet} key={pet.id} />
        ))}
        {petAddMode ? (
          <PetEditor
            petTypes={petTypes}
            onSave={onPetSave}
            onCancel={onPetAddCancel}
          />
        ) : (
          <AddCard onAdd={onPetAdd} />
        )}
      </div>
      <h3>Визиты в клинику: </h3>
      <div className="visits-container">
        {visits.map((visit) => {
          const pet = pets.find((pet) => pet.id === visit.petId);
          return <VisitCard visit={visit} pet={pet!} key={visit.id} />;
        })}
        {visitAddMode ? (
          <VisitEditor
            onCancel={onVisitAddCancel}
            onSave={onVisitSave}
            pets={pets}
          />
        ) : (
          <AddCard onAdd={onVisitAdd} />
        )}
      </div>
    </div>
  );
};
