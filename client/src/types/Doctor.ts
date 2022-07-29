import { User } from './User';

export type Doctor = {
  id?: number;
  name: string;
  phone: string;
  education: string;
  experience: string;
  achievements: string;
  serviceTypes: string;
  userId?: number;
  user?: User;
  login: string;
};
