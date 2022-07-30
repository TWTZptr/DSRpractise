import { User } from '../../types/User';
import React from 'react';
import { Visit } from '../../types/Visit';
import { getVisitsByDoctor } from '../../services/doctorsService';
import { UserPersonal } from '../UserPersonal/UserPersonal';
import { VisitItem } from './VisitItem/VisitItem';

interface DoctorProfileProps {
  user: User;
}

export const DoctorProfile = ({ user }: DoctorProfileProps) => {
  const [visits, setVisits] = React.useState<Visit[]>([]);
  const [selectedVisit, setSelectedVisit] = React.useState<Visit | null>(null);

  React.useEffect(() => {
    const fetchVisits = async () => {
      const visitsResponse = await getVisitsByDoctor(user.id);

      if (visitsResponse.ok) {
        setVisits(visitsResponse.data);
      }
    };

    fetchVisits();
  }, [user.id]);

  const onVisitSelect = React.useCallback((visit: Visit) => {
    setSelectedVisit(visit);
  }, []);

  return (
    <div className="doctor-profile-container">
      <UserPersonal user={user} />
      <h3>Посещения: </h3>
      {visits.map((visit) => (
        <VisitItem
          visit={visit}
          onOpen={onVisitSelect}
          opened={visit.id === selectedVisit?.id}
        />
      ))}
    </div>
  );
};
