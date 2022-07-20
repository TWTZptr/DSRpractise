export type User = {
  id: number;
  login: string;
  email: string;
  name: string;
  banned: boolean;
  roleId: number;
  phone: string;
  role: {
    id: number;
    name: string;
  };
};
