import { DoctorCreationData } from '../../types/DoctorCreationData';

export const INIT_DOCTOR: DoctorCreationData = {
  name: '',
  phone: '',
  education: '',
  experience: '',
  achievements: '',
  serviceTypes: '',
  login: '',
  password: '',
};
export const SHOW_SAVED_MSG_TIME = 5000;
export const USER_WITH_THAT_LOGIN_ALREADY_EXISTS_MSG =
  'Пользователь с таким логином уже существует';
