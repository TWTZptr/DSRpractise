import axios from 'axios';

export const tryLogin = async (
  login: string,
  password: string,
): Promise<any> => {
  const response = await axios.post('/api/auth/login', {
    login,
    password,
  });
  console.log(response.data);
  return response.data;
};
