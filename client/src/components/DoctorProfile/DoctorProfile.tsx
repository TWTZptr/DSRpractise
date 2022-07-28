import { User } from '../../types/User';

interface DoctorProfileProps {
  user: User;
}

export const DoctorProfile = ({ user }: DoctorProfileProps) => {
  return <div className="doctor-profile-container"></div>;
};
