import { Visit } from '../../../types/Visit';
import React from 'react';
import './VisitItem.scss';
import { Pet } from '../../../types/Pet';
import { getPetById } from '../../../services/petsService';
import { getUserById } from '../../../services/usersService';
import { User } from '../../../types/User';

interface VisitItemProps {
  visit: Visit;
  onOpen: (visit: Visit) => void;
  opened: boolean;
}

export const VisitItem = React.memo(
  ({ visit, onOpen, opened }: VisitItemProps) => {
    const [pet, setPet] = React.useState<Pet | null>(null);
    const [owner, setOwner] = React.useState<User | null>(null);
    const date = new Date(visit.date);

    React.useEffect(() => {
      const fetchOwner = (petId: number) => {
        getUserById(petId).then((res) => {
          if (res.ok) {
            setOwner(res.data);
          }
        });
      };

      const fetchPet = () => {
        getPetById(visit.petId).then((res) => {
          if (res.ok) {
            setPet(res.data);
            fetchOwner(res.data.ownerId);
          }
        });
      };

      if (opened && !pet) {
        fetchPet();
      }
    }, [opened, pet, visit.petId]);

    const onClick = React.useCallback(() => {
      onOpen(visit);
    }, [onOpen, visit]);

    return (
      <div className="visit-item" onClick={onClick}>
        {date.toLocaleDateString()} {date.toLocaleTimeString()}
        {opened ? (
          <div className="full-info">
            <div>
              Питомец {pet?.name}, {pet?.petType.name}, {pet?.breed}
            </div>
            <div>{pet?.info ? pet?.info : 'Нет доп. информации'}</div>
            <div>
              Владелец {owner?.name}, {owner?.phone}
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  },
);
